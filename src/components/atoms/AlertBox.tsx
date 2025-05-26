'use client';

import { MdCheckCircle, MdError, MdWarning, MdInfo } from 'react-icons/md';
import { IconType } from 'react-icons';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertBoxProps {
  type?: AlertType;
  message: string;
  onClose?: () => void;
}

const config: Record<AlertType, {
  Icon: IconType;
  bg: string;
  border: string;
}> = {
  success: {
    Icon: MdCheckCircle,
    bg: 'bg-success',
    border: 'border-success-dark',
  },
  error: {
    Icon: MdError,
    bg: 'bg-danger',
    border: 'border-danger-dark',
  },
  warning: {
    Icon: MdWarning,
    bg: 'bg-warning',
    border: 'border-warning-dark',
  },
  info: {
    Icon: MdInfo,
    bg: 'bg-blue',
    border: 'border-blue-dark',
  },
};

export default function AlertBox({
  type = 'info',
  message,
  onClose,
}: AlertBoxProps) {
  const { Icon, bg, border } = config[type];

  return (
    <div
      className={`
        fixed bottom-4 left-4 max-w-xs
        flex items-start gap-3 p-4 rounded-lg border-l-4 ${bg} ${border} shadow-lg
        z-50
      `}
      role="alert"
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <p className="flex-1 text-sm">{message}</p>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-black/10 transition-colors duration-200"
          aria-label="Cerrar alerta"
        >
          ✕
        </button>
      )}
    </div>
  );
}
