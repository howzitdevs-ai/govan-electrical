import { useRef, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Trash2, Upload } from "lucide-react";
import type { Package, PackageInput } from "@shared/types";
import { PACKAGE_CATEGORIES } from "@shared/packageCategories";
import { uploadPackageImage } from "@/lib/adminApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const TAG_COLOR_OPTIONS = [
  { value: "bg-red-500", label: "Red (Special Offer)" },
  { value: "bg-orange-500", label: "Orange (New!)" },
  { value: "bg-green-600", label: "Green" },
  { value: "bg-blue-600", label: "Blue" },
  { value: "bg-gray-800", label: "Dark Gray" },
];

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  tag: z.string().trim().optional(),
  tag2: z.string().trim().optional(),
  tagColor: z.string().optional(),
  imageUrl: z.string().trim().min(1, "An image is required"),
  features: z
    .array(z.object({ value: z.string().trim().min(1, "Feature can't be empty") }))
    .min(1, "Add at least one feature"),
  price: z.string().trim().min(1, "Price is required").regex(/^\d+(\.\d{1,2})?$/, "Enter a valid amount, e.g. 57000 or 57000.00"),
  oldPrice: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || /^\d+(\.\d{1,2})?$/.test(v), "Enter a valid amount, e.g. 59900"),
  categories: z.array(z.string()),
  isActive: z.boolean(),
});
type FormValues = z.infer<typeof formSchema>;

function centsToRand(cents?: number | null): string {
  if (cents === undefined || cents === null) return "";
  return (cents / 100).toFixed(2);
}

function randToCents(value: string): number {
  return Math.round(parseFloat(value) * 100);
}

interface AdminPackageFormProps {
  initialPackage?: Package | null;
  onSubmit: (input: PackageInput) => Promise<void>;
  onCancel: () => void;
}

export function AdminPackageForm({ initialPackage, onSubmit, onCancel }: AdminPackageFormProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialPackage?.title ?? "",
      tag: initialPackage?.tag ?? "",
      tag2: initialPackage?.tag2 ?? "",
      tagColor: initialPackage?.tagColor ?? "bg-red-500",
      imageUrl: initialPackage?.imageUrl ?? "",
      features: (initialPackage?.features ?? [""]).map((value) => ({ value })),
      price: centsToRand(initialPackage?.priceCents) || "",
      oldPrice: centsToRand(initialPackage?.oldPriceCents),
      categories: initialPackage?.categories ?? [],
      isActive: initialPackage?.isActive ?? true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const imageUrl = form.watch("imageUrl");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const url = await uploadPackageImage(file);
      form.setValue("imageUrl", url, { shouldValidate: true });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (values: FormValues) => {
    const input: PackageInput = {
      title: values.title,
      tag: values.tag || undefined,
      tag2: values.tag2 || undefined,
      tagColor: values.tagColor || undefined,
      imageUrl: values.imageUrl,
      features: values.features.map((f) => f.value),
      priceCents: randToCents(values.price),
      oldPriceCents: values.oldPrice ? randToCents(values.oldPrice) : undefined,
      categories: values.categories,
      isActive: values.isActive,
    };
    await onSubmit(input);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g. 5kW Deye System" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Badge (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. SPECIAL OFFER" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tag2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Second badge (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Most Popular" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tagColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge color</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {TAG_COLOR_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image */}
        <FormField
          control={form.control}
          name="imageUrl"
          render={() => (
            <FormItem>
              <FormLabel>Product image</FormLabel>
              <div className="flex items-center gap-4">
                {imageUrl ? (
                  <img src={imageUrl} alt="Package preview" className="w-20 h-20 object-cover rounded border" />
                ) : (
                  <div className="w-20 h-20 rounded border border-dashed flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="animate-spin" /> Uploading…
                      </>
                    ) : (
                      <>
                        <Upload /> {imageUrl ? "Replace image" : "Upload image"}
                      </>
                    )}
                  </Button>
                  {uploadError && <p className="text-red-500 text-xs mt-1">{uploadError}</p>}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Features */}
        <div>
          <FormLabel>Features</FormLabel>
          <div className="space-y-2 mt-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2">
                <FormField
                  control={form.control}
                  name={`features.${index}.value`}
                  render={({ field: inputField }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="e.g. 5kW Deye Inverter" {...inputField} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 1}
                >
                  <Trash2 className="size-4 text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            <Plus /> Add feature
          </Button>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price (R)</FormLabel>
                <FormControl>
                  <Input inputMode="decimal" placeholder="57000.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old price (R, optional)</FormLabel>
                <FormControl>
                  <Input inputMode="decimal" placeholder="59900.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Categories */}
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Filter categories</FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                {PACKAGE_CATEGORIES.map((cat) => {
                  const checked = field.value.includes(cat.slug);
                  return (
                    <label key={cat.slug} className="flex items-center gap-2 text-sm">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(v) => {
                          if (v) field.onChange([...field.value, cat.slug]);
                          else field.onChange(field.value.filter((s) => s !== cat.slug));
                        }}
                      />
                      {cat.label}
                    </label>
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Active */}
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(!!v)} />
              </FormControl>
              <FormLabel className="!mt-0">Visible on the public site</FormLabel>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting || uploading}>
            {form.formState.isSubmitting ? "Saving…" : "Save package"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
