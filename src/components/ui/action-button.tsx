import '@/components/ui/action-button.css';
import type { MouseEventHandler } from 'react';
import type { IconType } from 'react-icons';

interface ActionButtonProps {
    label: string;
    title: string;
    Icon: IconType;
    onClick: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

export function ActionButton({ label, Icon, onClick, disabled = false, title }: ActionButtonProps) {
    return (
        <button
            type="button"
            className="action-button"
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            <span className="action-button-icon">
                <Icon />
            </span>
            <span className="action-button-label">{label}</span>
        </button>
    );
}
