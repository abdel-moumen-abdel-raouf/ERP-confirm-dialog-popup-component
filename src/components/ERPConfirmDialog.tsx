import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Trash2,
  AlertOctagon,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  X,
  Loader2,
  CornerDownRight,
  Database,
  User,
  Clock
} from 'lucide-react';
import { DialogConfig } from '../types';

interface ERPConfirmDialogProps {
  isOpen: boolean;
  config: DialogConfig;
  onConfirm: () => void;
  onCancel: () => void;
  onAux?: () => void;
  onClose?: () => void;
  isInline?: boolean;
}

// Map configuration keys to Lucide Icons
const iconMap = {
  alert: AlertOctagon,
  check: CheckCircle,
  info: Info,
  trash: Trash2,
  warning: AlertTriangle,
  shield: ShieldAlert,
};

export const ERPConfirmDialog: React.FC<ERPConfirmDialogProps> = ({
  isOpen,
  config,
  onConfirm,
  onCancel,
  onAux,
  onClose,
  isInline,
}) => {
  const [localShowDetails, setLocalShowDetails] = React.useState(config.showDetails);

  // Sync state if config changes
  React.useEffect(() => {
    setLocalShowDetails(config.showDetails);
  }, [config.showDetails]);

  const SelectedIcon = iconMap[config.icon] || AlertTriangle;

  // Animation variants
  const getAnimationVariants = () => {
    const durationSec = config.animationDuration / 1000;
    
    // Select transition curves
    let ease: any = 'easeOut';
    if (config.animationEasing === 'ease-in-out') ease = 'easeInOut';
    if (config.animationEasing === 'linear') ease = 'linear';
    if (config.animationEasing === 'elastic') {
      ease = { type: 'spring', damping: 15, stiffness: 180 };
    } else {
      ease = { duration: durationSec, ease };
    }

    switch (config.animationType) {
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 50, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1, transition: ease },
          exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } }
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -50, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1, transition: ease },
          exit: { opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.2 } }
        };
      case 'fade':
        return {
          initial: { opacity: 0, scale: 1 },
          animate: { opacity: 1, scale: 1, transition: ease },
          exit: { opacity: 0, transition: { duration: 0.2 } }
        };
      case 'rotate-in':
        return {
          initial: { opacity: 0, scale: 0.8, rotate: -4 },
          animate: { opacity: 1, scale: 1, rotate: 0, transition: ease },
          exit: { opacity: 0, scale: 0.85, rotate: 2, transition: { duration: 0.2 } }
        };
      case 'scale':
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1, transition: ease },
          exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } }
        };
    }
  };

  // Theme styling definitions
  const getThemeClasses = () => {
    switch (config.theme) {
      case 'light':
        return {
          card: 'bg-white border border-slate-200/80 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)] text-slate-900',
          header: 'border-b border-slate-100 bg-slate-50/50',
          badge: 'bg-indigo-50 text-indigo-700 border-indigo-100 border',
          body: 'text-slate-600 font-sans',
          footer: 'bg-slate-50 border-t border-slate-100',
          affectedBox: 'bg-slate-50/80 border border-slate-200/60 text-slate-700',
          recordsLabel: 'text-slate-500 font-bold uppercase tracking-wider',
          detailsBtn: 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/50 rounded-md transition-colors',
          detailsBox: 'bg-slate-100/70 text-slate-700 font-mono border-l-2 border-indigo-500',
          closeBtn: 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md',
        };
      case 'slate':
        return {
          card: 'bg-[#15171C] border border-[#2A2E3D] shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-slate-100',
          header: 'border-b border-[#1F232E]/80 bg-[#0F1115]/30',
          badge: 'bg-[#1F232E] text-slate-300 border-[#2A2E3D] border',
          body: 'text-slate-300 font-sans',
          footer: 'bg-[#0F1115]/20 border-t border-[#1F232E]/80',
          affectedBox: 'bg-[#0F1115]/50 border border-[#1F232E]/70 text-slate-300',
          recordsLabel: 'text-slate-400 font-bold uppercase tracking-wider',
          detailsBtn: 'text-slate-400 hover:text-slate-200 hover:bg-[#1F232E]/50 rounded-md transition-all',
          detailsBox: 'bg-[#0F1115]/80 text-slate-300 font-mono border-l-2 border-indigo-500/80',
          closeBtn: 'text-slate-400 hover:text-slate-200 hover:bg-[#1F232E] rounded-md',
        };
      case 'amber':
        return {
          card: 'bg-[#161310] border border-amber-950/60 shadow-[0_20px_50px_rgba(217,119,6,0.08)] text-amber-50/95',
          header: 'border-b border-amber-950/40 bg-[#1D1712]/30',
          badge: 'bg-amber-950/50 text-amber-300 border-amber-900/40 border',
          body: 'text-amber-200/80 font-sans',
          footer: 'bg-black/10 border-t border-amber-950/40',
          affectedBox: 'bg-black/30 border border-amber-950/40 text-amber-200/90',
          recordsLabel: 'text-amber-400 font-bold uppercase tracking-wider',
          detailsBtn: 'text-amber-400 hover:text-amber-300 hover:bg-amber-950/30 rounded-md transition-all',
          detailsBox: 'bg-black/40 text-amber-200/80 font-mono border-l-2 border-amber-600',
          closeBtn: 'text-zinc-500 hover:text-amber-300 hover:bg-zinc-900 rounded-md',
        };
      case 'sleek':
        return {
          card: 'bg-[#0B0D13]/90 backdrop-blur-xl border border-indigo-500/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(99,102,241,0.15)] text-indigo-50/95',
          header: 'border-b border-indigo-500/10 bg-indigo-950/20',
          badge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30 border',
          body: 'text-indigo-200/80 font-sans',
          footer: 'bg-indigo-950/10 border-t border-indigo-500/10',
          affectedBox: 'bg-indigo-950/20 border border-indigo-500/15 text-indigo-200/90',
          recordsLabel: 'text-indigo-400 font-bold uppercase tracking-wider',
          detailsBtn: 'text-indigo-400 hover:text-indigo-300 hover:bg-indigo-950/30 rounded-md transition-all',
          detailsBox: 'bg-black/45 text-indigo-200/80 font-mono border-l-2 border-indigo-500',
          closeBtn: 'text-indigo-400 hover:text-indigo-200 hover:bg-indigo-950/40 rounded-md',
        };
      case 'dark':
      default:
        return {
          card: 'bg-[#0F1115] border border-[#1F232E] shadow-[0_25px_60px_rgba(0,0,0,0.65)] text-slate-100',
          header: 'border-b border-[#1F232E]/85 bg-[#15171C]/50',
          badge: 'bg-[#1F232E] text-rose-400 border-rose-900/40 border',
          body: 'text-slate-300 font-sans',
          footer: 'bg-[#15171C]/30 border-t border-[#1F232E]/80',
          affectedBox: 'bg-[#15171C]/50 border border-[#1F232E]/60 text-slate-300',
          recordsLabel: 'text-rose-400/80 font-bold uppercase tracking-wider',
          detailsBtn: 'text-rose-400 hover:text-rose-300 hover:bg-rose-950/20 rounded-md transition-all',
          detailsBox: 'bg-black/60 text-zinc-300 font-mono border-l-2 border-rose-500',
          closeBtn: 'text-zinc-400 hover:text-zinc-200 hover:bg-[#15171C] rounded-md',
        };
    }
  };

  const themeClasses = getThemeClasses();

  // Helper classes for buttons
  const getButtonClasses = (variant: string) => {
    const base = 'px-4 py-2 text-sm font-semibold tracking-wide rounded-md transition-all duration-200 flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2';
    switch (variant) {
      case 'primary':
        return `${base} bg-blue-600 hover:bg-blue-500 text-white focus:ring-blue-500 shadow-lg shadow-blue-900/20 active:scale-98`;
      case 'danger':
        return `${base} bg-rose-600 hover:bg-rose-500 text-white focus:ring-rose-500 shadow-lg shadow-rose-900/20 active:scale-98`;
      case 'warning':
        return `${base} bg-amber-600 hover:bg-amber-500 text-white focus:ring-amber-500 shadow-lg shadow-amber-900/20 active:scale-98`;
      case 'success':
        return `${base} bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500 shadow-lg shadow-emerald-900/20 active:scale-98`;
      case 'secondary':
        return `${base} bg-[#1F232E] hover:bg-[#2A2E3D] text-slate-200 focus:ring-zinc-600 border border-[#2A2E3D]`;
      case 'outline':
      default:
        return `${base} bg-transparent hover:bg-[#1F232E] text-slate-400 hover:text-slate-100 border border-[#1F232E] focus:ring-zinc-700`;
    }
  };

  // Map dialog width key to CSS class
  const getWidthClass = () => {
    if (config.width === 'custom') return '';
    switch (config.width) {
      case 'sm': return 'max-w-md';
      case 'lg': return 'max-w-2xl';
      case 'xl': return 'max-w-4xl';
      case 'md':
      default:
        return 'max-w-lg';
    }
  };

  const widthStyle = config.width === 'custom' ? { width: config.customWidth } : {};

  // Map icon animation types to tailwind classes
  const getIconAnimationClass = () => {
    switch (config.iconAnimation) {
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'bounce': return 'animate-bounce';
      default: return '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={config.overlayId || 'erp-dialog-overlay'}
          className={`${isInline ? 'absolute' : 'fixed'} inset-0 flex items-center justify-center p-4`}
          dir={config.dir || 'ltr'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: config.animationDuration / 1000 }}
          style={{
            zIndex: config.zIndex,
            backgroundColor: `rgba(0, 0, 0, ${config.overlayOpacity})`,
            backdropFilter: `blur(${config.overlayBlur})`,
          }}
        >
          {/* Main Backdrop click area */}
          <div
            className="absolute inset-0 cursor-default"
            onClick={onCancel}
          />

          {/* Dialog Card Container */}
          <motion.div
            id={config.dialogId || 'erp-dialog-container'}
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              borderRadius: config.borderRadius,
              ...widthStyle
            }}
            className={`w-full relative z-10 overflow-hidden shadow-2xl transition-all duration-150 ${getWidthClass()} ${themeClasses.card}`}
          >
            {/* Header section */}
            <div
              id={config.headerId || 'erp-dialog-header'}
              className={`p-5 flex items-start justify-between gap-4 ${themeClasses.header}`}
            >
              <div className="flex items-start gap-3.5">
                {/* Icon block */}
                <div
                  id={config.iconId || 'erp-dialog-icon'}
                  className={`p-2.5 rounded-lg flex items-center justify-center shrink-0 ${getIconAnimationClass()}`}
                  style={{
                    backgroundColor: config.iconBgColor,
                    color: config.iconColor
                  }}
                >
                  <SelectedIcon className="w-6 h-6 stroke-[2.25]" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-lg font-bold tracking-tight text-current leading-tight">
                      {config.title}
                    </h3>
                    {config.showBadge && config.badgeText && (
                      <span className={`px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest rounded-md ${themeClasses.badge}`}>
                        {config.badgeText}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-medium text-slate-500 mt-1">
                    {config.subtitle}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className={`p-1.5 rounded-md transition-colors ${themeClasses.closeBtn}`}
                  title="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Body text & data lists */}
            <div
              id={config.bodyId || 'erp-dialog-body'}
              className="p-5 space-y-4 text-sm"
            >
              <p className={`leading-relaxed ${config.align === 'center' ? 'text-center' : 'text-start'} ${themeClasses.body}`}>
                {config.message}
              </p>

              {/* Affected Records Block */}
              {config.affectedRecords && config.affectedRecords.length > 0 && (
                <div className={`p-4 rounded-lg space-y-2 ${themeClasses.affectedBox}`}>
                  <div className={`text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 ${themeClasses.recordsLabel}`}>
                    <Database className="w-3.5 h-3.5" />
                    Impacted Ledger Objects ({config.affectedRecords.length})
                  </div>
                  <ul className="space-y-1.5 text-xs">
                    {config.affectedRecords.map((record, index) => (
                      <li key={index} className="flex items-start gap-1.5 font-medium">
                        <CornerDownRight className="w-3.5 h-3.5 shrink-0 opacity-60 mt-0.5 transform transition-transform ltr:scale-x-100 rtl:-scale-x-100" />
                        <span>{record}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Collapsible Meta Information */}
              {config.detailedMessage && (
                <div className="pt-2">
                  <button
                    onClick={() => setLocalShowDetails(!localShowDetails)}
                    className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-md transition-all ${themeClasses.detailsBtn}`}
                  >
                    <span>{localShowDetails ? 'Hide' : 'Show'} ERP Diagnostics & Metadata</span>
                    {localShowDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {localShowDetails && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden mt-2"
                      >
                        <pre className={`p-3.5 rounded-lg text-xs leading-relaxed whitespace-pre-wrap ${themeClasses.detailsBox}`}>
                          {config.detailedMessage}
                        </pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer Buttons */}
            <div
              id={config.footerId || 'erp-dialog-footer'}
              className={`px-5 py-4 flex flex-col sm:flex-row items-center justify-end gap-3 ${themeClasses.footer}`}
            >
              {config.auxBtn && config.auxBtn.show && (
                <button
                  id={config.auxBtn.customId || 'erp-dialog-aux-btn'}
                  disabled={config.auxBtn.disabled || config.auxBtn.loading}
                  onClick={onAux}
                  className={`${getButtonClasses(config.auxBtn.variant)} w-full sm:w-auto sm:me-auto`}
                >
                  {config.auxBtn.loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{config.auxBtn.text}</span>
                </button>
              )}

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                {config.cancelBtn && config.cancelBtn.show && (
                  <button
                    id={config.cancelBtn.customId || 'erp-dialog-cancel-btn'}
                    disabled={config.cancelBtn.disabled || config.cancelBtn.loading}
                    onClick={onCancel}
                    className={`${getButtonClasses(config.cancelBtn.variant)} w-full sm:w-auto`}
                  >
                    {config.cancelBtn.loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{config.cancelBtn.text}</span>
                  </button>
                )}

                {config.confirmBtn && config.confirmBtn.show && (
                  <button
                    id={config.confirmBtn.customId || 'erp-dialog-confirm-btn'}
                    disabled={config.confirmBtn.disabled || config.confirmBtn.loading}
                    onClick={onConfirm}
                    className={`${getButtonClasses(config.confirmBtn.variant)} w-full sm:w-auto`}
                  >
                    {config.confirmBtn.loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    <span>{config.confirmBtn.text}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
