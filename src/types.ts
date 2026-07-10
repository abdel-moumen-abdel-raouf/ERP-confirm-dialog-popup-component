export type DialogTheme = 'light' | 'dark' | 'slate' | 'amber';
export type DialogWidth = 'sm' | 'md' | 'lg' | 'xl' | 'custom';
export type DialogAnimation = 'scale' | 'slide-up' | 'fade' | 'slide-down' | 'rotate-in';
export type DialogIconType = 'alert' | 'check' | 'info' | 'trash' | 'warning' | 'shield';

export interface ButtonConfig {
  text: string;
  variant: 'primary' | 'danger' | 'warning' | 'success' | 'secondary' | 'outline';
  show: boolean;
  disabled: boolean;
  loading: boolean;
  customId: string;
}

export interface DialogConfig {
  // Header
  title: string;
  subtitle: string;
  badgeText: string;
  showBadge: boolean;
  headerId: string;

  // Icon
  icon: DialogIconType;
  iconColor: string; // Tailwind color or custom hex
  iconBgColor: string;
  iconAnimation: 'none' | 'pulse' | 'spin' | 'bounce';
  iconId: string;

  // Body Content
  message: string;
  detailedMessage: string;
  showDetails: boolean;
  affectedRecords: string[]; // List of affected records e.g. ["Invoice #29481", "Ledger Acc #4001"]
  bodyId: string;

  // Footer Buttons
  confirmBtn: ButtonConfig;
  cancelBtn: ButtonConfig;
  auxBtn: ButtonConfig;
  footerId: string;

  // Layout & Styling
  theme: DialogTheme;
  width: DialogWidth;
  customWidth: string; // e.g. '600px'
  zIndex: number;
  borderRadius: string; // e.g. '12px'
  overlayOpacity: number; // e.g. 0.5
  overlayBlur: string; // e.g. '4px'
  align: 'left' | 'center';
  dialogId: string;
  overlayId: string;
  dir: 'ltr' | 'rtl';

  // Animation
  animationType: DialogAnimation;
  animationDuration: number; // in milliseconds
  animationEasing: 'ease-out' | 'ease-in-out' | 'elastic' | 'linear';
}

export interface DialogPreset {
  name: string;
  description: string;
  config: Partial<DialogConfig>;
}
