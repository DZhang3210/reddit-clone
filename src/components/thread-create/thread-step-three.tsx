import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const availableTags = [
  "Technology",
  "Gaming",
  "Sports",
  "Music",
  "Art",
  "Science",
  "Politics",
  "Food",
  "Travel",
  "Fashion",
];

export function StepThree({ formData, updateFormData }) {
  const [inputTag, setInputTag] = useState("");

  const addTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      updateFormData({ tags: [...formData.tags, tag] });
    }
    setInputTag("");
  };

  const removeTag = (tag) => {
    updateFormData({ tags: formData.tags.filter((t) => t !== tag) });
  };

  return (
    <div className="space-y-4">
      <Label>Community Tags</Label>
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <Button
            key={tag}
            variant={formData.tags.includes(tag) ? "secondary" : "outline"}
            size="sm"
            onClick={() =>
              formData.tags.includes(tag) ? removeTag(tag) : addTag(tag)
            }
          >
            {tag}
          </Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          placeholder="Add custom tag"
        />
        <Button onClick={() => addTag(inputTag)} disabled={!inputTag}>
          Add
        </Button>
      </div>
      <div className="mt-4">
        <Label>Selected Tags:</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <Button
              key={tag}
              variant="secondary"
              size="sm"
              onClick={() => removeTag(tag)}
            >
              {tag} ✕
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
