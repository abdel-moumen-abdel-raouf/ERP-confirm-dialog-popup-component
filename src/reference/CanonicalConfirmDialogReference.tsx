import { ERPConfirmDialog } from '../components/ERPConfirmDialog';
import { DialogConfig } from '../types';

const CANONICAL_CONFIRM_CONFIG: DialogConfig = {
  title: 'حذف فاتورة مبيعات؟',
  subtitle: 'تعديل سجلات المبيعات والضرائب المعتمدة',
  badgeText: 'خطورة تدقيق قصوى',
  showBadge: true,
  headerId: 'erp-dialog-header',
  icon: 'trash',
  iconColor: '#EF4444',
  iconBgColor: '#FEE2E2',
  iconAnimation: 'bounce',
  iconId: 'erp-dialog-icon',
  message: 'أنت على وشك حذف فاتورة مبيعات معتمدة برقم INV-2026-0041 نهائياً. سيؤدي هذا الإجراء إلى إلغاء جميع قيود اليومية المرتبطة، وتنبيه الإدارة المالية، وتوليد فجوة في تدقيق ضريبة القيمة المضافة.',
  detailedMessage: 'Audit Case ID: VAT-INV-2026-0041\nApproval Channel: Finance Governance Desk\nLast Reviewer: ERP Internal Control Team',
  showDetails: false,
  affectedRecords: [
    'فاتورة مبيعات INV-2026-0041 (القيمة: 142,500.00 ر.س)',
    'قيد اليومية JV-SL-9021 (دائن/مدين)',
    'سجل إقرارات ضريبة القيمة المضافة للربع الثاني 2026'
  ],
  bodyId: 'erp-dialog-body',
  confirmBtn: {
    text: 'تأكيد الحذف نهائياً',
    variant: 'danger',
    show: true,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-confirm-btn',
  },
  cancelBtn: {
    text: 'إلغاء والاحتفاظ بالفاتورة',
    variant: 'outline',
    show: true,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-cancel-btn',
  },
  auxBtn: {
    text: 'سياسة التدقيق المالي',
    variant: 'secondary',
    show: true,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-aux-btn',
  },
  footerId: 'erp-dialog-footer',
  theme: 'dark',
  width: 'md',
  customWidth: '520px',
  zIndex: 1400,
  borderRadius: '16px',
  overlayOpacity: 0.65,
  overlayBlur: '6px',
  align: 'left',
  dialogId: 'erp-dialog-container',
  overlayId: 'erp-dialog-overlay',
  dir: 'rtl',
  animationType: 'scale',
  animationDuration: 350,
  animationEasing: 'ease-out',
};

export function CanonicalConfirmDialogReference() {
  return (
    <div className="min-h-screen bg-[#0F1115]">
      <ERPConfirmDialog
        isOpen={true}
        config={CANONICAL_CONFIRM_CONFIG}
        onConfirm={() => undefined}
        onCancel={() => undefined}
        onAux={() => undefined}
        onClose={() => undefined}
      />
    </div>
  );
}

export { CANONICAL_CONFIRM_CONFIG };
