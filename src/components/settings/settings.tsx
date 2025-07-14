import { ThemeForm } from '@/components/settings/theme-form';
import * as modalStyles from '@/components/ui/modal.styles';

interface SettingsProps {
    closeHandler: () => void;
}

export function Settings({ closeHandler }: SettingsProps) {
    return (
        <div css={modalStyles.modalContainer}>
            <div css={modalStyles.modalHeader}>
                <h1>Settings</h1>
                <button type="button" css={modalStyles.modalClose} onClick={closeHandler}>
                    &times;
                </button>
            </div>
            <div css={modalStyles.modalContent}>
                <ThemeForm closeHandler={closeHandler} />
            </div>
        </div>
    );
}
