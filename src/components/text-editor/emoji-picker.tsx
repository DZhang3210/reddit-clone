import { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="relative">
      <button
        aria-label="emoji-picker"
        onClick={() => setShowPicker(!showPicker)}
        className="w-4 h-4 hover:bg-gray-200 rounded-full "
      >
        😊
      </button>
      {showPicker && (
        <div className="absolute z-10">
          <Picker
            data={data}
            onEmojiSelect={(emoji: { native: string }) => {
              onEmojiSelect(emoji.native);
              setShowPicker(false);
            }}
          />
        </div>
      )}
    </div>
  );
};
