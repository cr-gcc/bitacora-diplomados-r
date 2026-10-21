export interface SessionOption {
    label: string;
    action: () => void;
    variant: 'default' | 'destructive';
}