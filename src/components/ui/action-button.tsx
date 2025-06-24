import * as styles from '@/components/ui/action-button.styles';
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
            css={styles.actionButton}
            onClick={onClick}
            disabled={disabled}
            title={title}
        >
            <span css={styles.actionButtonIcon}>
                <Icon />
            </span>
            <span css={styles.actionButtonLabel}>{label}</span>
        </button>
    );
}
