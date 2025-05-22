import tokens from '@/utils/Token';
import { CustomIcons } from "@/utils/Icons";

interface CustomButtonProps {
  text?: string
  color: 'primaryButton' | 'secondaryButton'
  typeButton?: 'button' | 'submit'
  icon?: string
  onClickButton?: () => void
}

export default function CustomButton({ text, color, onClickButton, typeButton, icon }: CustomButtonProps) {
  return (
    <button 
      className={tokens[color]} 
      type={typeButton || 'button'}
      onClick={onClickButton}
    >
      {icon ? (
      <span className="mr-2 flex gap-2 items-center justify-center">
        {CustomIcons[icon as keyof typeof CustomIcons]({ className: "w-6 h-6" })} {text}
      </span>
      ) : (
      text
      )}
    </button>
  )
}