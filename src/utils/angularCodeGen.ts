import { DialogConfig } from '../types';

export interface CodeTemplateResult {
  ts: string;
  html: string;
  scss: string;
  react: string;
}

export function generateCodeTemplates(config: DialogConfig): CodeTemplateResult {
  // Angular TS
  const ts = `import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

export type DialogTheme = 'light' | 'dark' | 'slate' | 'amber' | 'sleek';
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

@Component({
  selector: 'app-erp-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './erp-confirm-dialog.component.html',
  styleUrls: ['./erp-confirm-dialog.component.scss'],
  animations: [
    trigger('dialogTransition', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: \\\`\\\${
            '${config.animationType}' === 'scale' ? 'scale(0.9)' :
            '${config.animationType}' === 'slide-up' ? 'translateY(50px) scale(0.96)' :
            '${config.animationType}' === 'slide-down' ? 'translateY(-50px) scale(0.96)' :
            '${config.animationType}' === 'rotate-in' ? 'scale(0.8) rotate(-4deg)' : 'scale(1)'
          }\\\`
        }),
        animate(
          '${config.animationDuration}ms \\\${
            '${config.animationEasing}' === 'elastic' ? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' :
            '${config.animationEasing}' === 'ease-in-out' ? 'ease-in-out' : 'ease-out'
          }',
          style({ opacity: 1, transform: 'scale(1) translateY(0) rotate(0)' })
        )
      ]),
      transition(':leave', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: \\\`\\\${
              '${config.animationType}' === 'scale' ? 'scale(0.92)' :
              '${config.animationType}' === 'slide-up' ? 'translateY(40px)' :
              '${config.animationType}' === 'slide-down' ? 'translateY(-40px)' :
              '${config.animationType}' === 'rotate-in' ? 'scale(0.85) rotate(2deg)' : 'scale(1)'
            }\\\`
          })
        )
      ])
    ])
  ]
})
export class ErpConfirmDialogComponent {
  // Header Customization (with default fallbacks)
  readonly title = input<string>('${config.title.replace(/'/g, "\\\\\\'")}');
  readonly subtitle = input<string>('${config.subtitle.replace(/'/g, "\\\\\\'")}');
  readonly badgeText = input<string>('${config.badgeText.replace(/'/g, "\\\\\\'")}');
  readonly showBadge = input<boolean>(${config.showBadge});
  readonly headerId = input<string>('${config.headerId}');

  // Icon Customization
  readonly icon = input<DialogIconType>('${config.icon}');
  readonly iconColor = input<string>('${config.iconColor}');
  readonly iconBgColor = input<string>('${config.iconBgColor}');
  readonly iconAnimation = input<'none' | 'pulse' | 'spin' | 'bounce'>('${config.iconAnimation}');
  readonly iconId = input<string>('${config.iconId}');

  // Content Customization
  readonly message = input<string>('${config.message.replace(/'/g, "\\\\\\'")}');
  readonly detailedMessage = input<string>(\\\`${config.detailedMessage.replace(/`/g, '\\\\\\`').replace(/\\\\\\$/g, '\\\\\\$')}\\\`);
  readonly showDetails = input<boolean>(${config.showDetails});
  readonly affectedRecords = input<string[]>(${JSON.stringify(config.affectedRecords, null, 2)});
  readonly bodyId = input<string>('${config.bodyId}');

  // Buttons Configuration
  readonly confirmBtn = input<ButtonConfig>({
    text: '${config.confirmBtn.text.replace(/'/g, "\\\\\\'")}',
    variant: '${config.confirmBtn.variant}',
    show: ${config.confirmBtn.show},
    disabled: ${config.confirmBtn.disabled},
    loading: ${config.confirmBtn.loading},
    customId: '${config.confirmBtn.customId}'
  });

  readonly cancelBtn = input<ButtonConfig>({
    text: '${config.cancelBtn.text.replace(/'/g, "\\\\\\'")}',
    variant: '${config.cancelBtn.variant}',
    show: ${config.cancelBtn.show},
    disabled: ${config.cancelBtn.disabled},
    loading: ${config.cancelBtn.loading},
    customId: '${config.cancelBtn.customId}'
  });

  readonly auxBtn = input<ButtonConfig>({
    text: '${config.auxBtn.text.replace(/'/g, "\\\\\\'")}',
    variant: '${config.auxBtn.variant}',
    show: ${config.auxBtn.show},
    disabled: ${config.auxBtn.disabled},
    loading: ${config.auxBtn.loading},
    customId: '${config.auxBtn.customId}'
  });
  readonly footerId = input<string>('${config.footerId}');

  // Layout & Theming
  readonly theme = input<DialogTheme>('${config.theme}');
  readonly width = input<DialogWidth>('${config.width}');
  readonly customWidth = input<string>('${config.customWidth}');
  readonly zIndex = input<number>(${config.zIndex});
  readonly borderRadius = input<string>('${config.borderRadius}');
  readonly overlayOpacity = input<number>(${config.overlayOpacity});
  readonly overlayBlur = input<string>('${config.overlayBlur}');
  readonly align = input<'left' | 'center'>('${config.align}');
  readonly dir = input<'ltr' | 'rtl'>('${config.dir || 'ltr'}');
  
  readonly dialogId = input<string>('${config.dialogId}');
  readonly overlayId = input<string>('${config.overlayId}');

  // Component State
  readonly localShowDetails = signal<boolean>(${config.showDetails});

  // Outputs for ERP Handlers
  readonly confirm = output<void>();
  readonly cancel = output<void>();
  readonly auxAction = output<void>();
  readonly close = output<void>();

  toggleDetails(): void {
    this.localShowDetails.update(v => !v);
  }

  onConfirm(): void {
    const btn = this.confirmBtn();
    if (!btn.disabled && !btn.loading) {
      this.confirm.emit();
    }
  }

  onCancel(): void {
    const btn = this.cancelBtn();
    if (!btn.disabled && !btn.loading) {
      this.cancel.emit();
    }
  }

  onAux(): void {
    const btn = this.auxBtn();
    if (!btn.disabled && !btn.loading) {
      this.auxAction.emit();
    }
  }

  onCloseClick(): void {
    this.close.emit();
  }
}
`;

  // Angular HTML
  const html = `<!-- ERP Custom Dynamic Overlay Backdrop -->
<div [id]="overlayId()" 
     class="erp-dialog-overlay-backdrop"
     [attr.dir]="dir()"
     [style.z-index]="zIndex()"
     [style.background-color]="'rgba(0,0,0,' + overlayOpacity() + ')'"
     [style.backdrop-filter]="'blur(' + overlayBlur() + ')'"
     (click)="onCancel()">

  <!-- Dialog Window -->
  <div [id]="dialogId()" 
       [@dialogTransition]
       class="erp-dialog-card-container"
       [ngClass]="'erp-theme-' + theme() + ' erp-width-' + width()"
       [style.border-radius]="borderRadius()"
       [style.width]="width() === 'custom' ? customWidth() : null"
       (click)="$event.stopPropagation()">

    <!-- Header Block -->
    <div [id]="headerId()" class="erp-dialog-header-wrapper">
      <div class="erp-header-content-left">
        <!-- Customizable Status Icon with Micro-Animation -->
        <div [id]="iconId()" 
             class="erp-header-icon-box"
             [ngClass]="'erp-anim-' + iconAnimation()"
             [style.background-color]="iconBgColor()"
             [style.color]="iconColor()">
          
          <!-- Icon templates -->
          @switch (icon()) {
            @case ('trash') {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
            }
            @case ('check') {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            }
            @case ('info') {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
            }
            @case ('warning') {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            }
            @case ('shield') {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            }
            @default {
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" class="icon-svg"><circle cx="12" cy="12" r="10"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            }
          }
        </div>

        <div class="erp-header-titles">
          <div class="erp-title-row">
            <h3 class="erp-title-text">{{ title() }}</h3>
            @if (showBadge() && badgeText()) {
              <span class="erp-header-badge">{{ badgeText() }}</span>
            }
          </div>
          <p class="erp-subtitle-text">{{ subtitle() }}</p>
        </div>
      </div>

      <!-- Header Close Action Button -->
      <button class="erp-header-close-btn" (click)="onCloseClick()" title="Close dialog">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>

    <!-- Body Information Block -->
    <div [id]="bodyId()" class="erp-dialog-body-wrapper">
      <p class="erp-message-text" [ngClass]="'align-' + align()">{{ message() }}</p>

      <!-- Database records impacted panel -->
      @if (affectedRecords() && affectedRecords().length > 0) {
        <div class="erp-records-warning-panel">
          <div class="erp-panel-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="erp-panel-icon"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M3 11h18"/><path d="M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="m19 19-4-4"/></svg>
            <span>Impacted Ledger Objects ({{ affectedRecords().length }})</span>
          </div>
          <ul class="erp-records-list">
            @for (record of affectedRecords(); track record) {
              <li class="erp-record-item">
                <svg class="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                <span>{{ record }}</span>
              </li>
            }
          </ul>
        </div>
      }

      <!-- Metadata & diagnostics details -->
      @if (detailedMessage()) {
        <div class="erp-diagnostics-container">
          <button class="erp-toggle-diagnostics-btn" (click)="toggleDetails()">
            <span>{{ localShowDetails() ? 'Hide' : 'Show' }} ERP Diagnostics & Metadata</span>
            <svg [style.transform]="localShowDetails() ? 'rotate(180deg)' : 'none'" class="chevron-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </button>
          
          @if (localShowDetails()) {
            <div class="erp-diagnostics-details-box">
              <pre>{{ detailedMessage() }}</pre>
            </div>
          }
        </div>
      }
    </div>

    <!-- Footer Action Buttons -->
    <div [id]="footerId()" class="erp-dialog-footer-wrapper">
      <!-- Auxiliary / Policy Button -->
      @if (auxBtn() && auxBtn().show) {
        <button [id]="auxBtn().customId"
                [disabled]="auxBtn().disabled || auxBtn().loading"
                [ngClass]="'erp-btn-' + auxBtn().variant"
                class="erp-btn-base erp-btn-aux"
                (click)="onAux()">
          @if (auxBtn().loading) {
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
          }
          <span>{{ auxBtn().text }}</span>
        </button>
      }

      <div class="erp-footer-actions-right">
        <!-- Cancel Operation Button -->
        @if (cancelBtn() && cancelBtn().show) {
          <button [id]="cancelBtn().customId"
                  [disabled]="cancelBtn().disabled || cancelBtn().loading"
                  [ngClass]="'erp-btn-' + cancelBtn().variant"
                  class="erp-btn-base"
                  (click)="onCancel()">
            @if (cancelBtn().loading) {
              <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
            }
            <span>{{ cancelBtn().text }}</span>
          </button>
        }

        <!-- Proceed Confirmation Button -->
        @if (confirmBtn() && confirmBtn().show) {
          <button [id]="confirmBtn().customId"
                  [disabled]="confirmBtn().disabled || confirmBtn().loading"
                  [ngClass]="'erp-btn-' + confirmBtn().variant"
                  class="erp-btn-base"
                  (click)="onConfirm()">
            @if (confirmBtn().loading) {
              <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path></svg>
            }
            <span>{{ confirmBtn().text }}</span>
          </button>
        }
      </div>
    </div>

  </div>
</div>
`;

  // Angular SCSS
  const scss = `// ==========================================
// ERP COMPONENT LEVEL SCSS (erp-confirm-dialog.component.scss)
// Supports Light, Dark, Slate, and Amber Themes
// Fully responsive with customizable IDs for targeting
// Supports dynamic bidirectional layout flow (RTL / LTR)
// ==========================================

// Global Overlay Backdrop
#\${config.overlayId || 'erp-dialog-overlay'} {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: background-color 0.2s ease-in-out, backdrop-filter 0.2s ease-in-out;
}

// Dialog Window Box
#\${config.dialogId || 'erp-dialog-container'} {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease-out, box-shadow 0.2s ease-out;

  // Responsive Breakpoints
  &.erp-width-sm { max-width: 440px; }
  &.erp-width-md { max-width: 540px; }
  &.erp-width-lg { max-width: 680px; }
  &.erp-width-xl { max-width: 900px; }

  @media (max-width: 640px) {
    max-width: 100% !important;
    border-radius: 12px !important;
    margin: 0.5rem;
  }
}

// ------------------------------------------
// THEME COLORS & PALETTES
// ------------------------------------------

// Theme Light
.erp-theme-light {
  background-color: #ffffff;
  color: #0f172a;
  border: 1px solid #e2e8f0;

  .erp-dialog-header-wrapper {
    background-color: #f8fafc;
    border-bottom: 1px solid #f1f5f9;
  }

  .erp-header-badge {
    background-color: #f1f5f9;
    color: #475569;
    border: 1px solid #cbd5e1;
  }

  .erp-subtitle-text { color: #64748b; }
  .erp-message-text { color: #334155; }

  .erp-records-warning-panel {
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    .erp-panel-header { color: #475569; }
  }

  .erp-toggle-diagnostics-btn {
    color: #4f46e5;
    &:hover { background-color: rgba(79, 70, 229, 0.05); }
  }

  .erp-diagnostics-details-box {
    background-color: #f1f5f9;
    color: #1e293b;
    border-inline-start: 3px solid #6366f1;
  }

  .erp-dialog-footer-wrapper {
    background-color: #f8fafc;
    border-top: 1px solid #f1f5f9;
  }

  .erp-header-close-btn {
    color: #94a3b8;
    &:hover { background-color: #f1f5f9; color: #334155; }
  }
}

// Theme Slate
.erp-theme-slate {
  background-color: #0f172a;
  color: #f1f5f9;
  border: 1px solid #1e293b;

  .erp-dialog-header-wrapper {
    background-color: #020617;
    border-bottom: 1px solid #1e293b;
  }

  .erp-header-badge {
    background-color: #1e293b;
    color: #94a3b8;
    border: 1px solid #334155;
  }

  .erp-subtitle-text { color: #64748b; }
  .erp-message-text { color: #cbd5e1; }

  .erp-records-warning-panel {
    background-color: #020617;
    border: 1px solid #1e293b;
    color: #cbd5e1;
    .erp-panel-header { color: #94a3b8; }
  }

  .erp-toggle-diagnostics-btn {
    color: #94a3b8;
    &:hover { background-color: rgba(148, 163, 184, 0.1); }
  }

  .erp-diagnostics-details-box {
    background-color: #020617;
    color: #cbd5e1;
    border-inline-start: 3px solid #64748b;
  }

  .erp-dialog-footer-wrapper {
    background-color: #020617;
    border-top: 1px solid #1e293b;
  }

  .erp-header-close-btn {
    color: #64748b;
    &:hover { background-color: #1e293b; color: #f1f5f9; }
  }
}

// Theme Amber (Warning / Advisory)
.erp-theme-amber {
  background-color: #09090b;
  color: #f4f4f5;
  border: 1px solid rgba(217, 119, 6, 0.3);
  box-shadow: 0 0 35px rgba(217, 119, 6, 0.1);

  .erp-dialog-header-wrapper {
    background-color: rgba(217, 119, 6, 0.05);
    border-bottom: 1px solid rgba(217, 119, 6, 0.2);
  }

  .erp-header-badge {
    background-color: rgba(217, 119, 6, 0.2);
    color: #f59e0b;
    border: 1px solid rgba(217, 119, 6, 0.4);
  }

  .erp-subtitle-text { color: #71717a; }
  .erp-message-text { color: #d4d4d8; }

  .erp-records-warning-panel {
    background-color: #18181b;
    border: 1px solid rgba(217, 119, 6, 0.15);
    color: #f59e0b;
    .erp-panel-header { color: #f59e0b; opacity: 0.85; }
  }

  .erp-toggle-diagnostics-btn {
    color: #f59e0b;
    &:hover { background-color: rgba(245, 158, 11, 0.1); }
  }

  .erp-diagnostics-details-box {
    background-color: #000000;
    color: #fcd34d;
    border-inline-start: 3px solid #d97706;
  }

  .erp-dialog-footer-wrapper {
    background-color: #000000;
    border-top: 1px solid rgba(217, 119, 6, 0.2);
  }

  .erp-header-close-btn {
    color: #71717a;
    &:hover { background-color: #18181b; color: #f4f4f5; }
  }
}

// Theme Dark (Default Dark)
.erp-theme-dark {
  background-color: #09090b;
  color: #f4f4f5;
  border: 1px solid #27272a;

  .erp-dialog-header-wrapper {
    background-color: #18181b;
    border-bottom: 1px solid #27272a;
  }

  .erp-header-badge {
    background-color: rgba(239, 68, 68, 0.15);
    color: #f43f5e;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .erp-subtitle-text { color: #71717a; }
  .erp-message-text { color: #d4d4d8; }

  .erp-records-warning-panel {
    background-color: #18181b;
    border: 1px solid #27272a;
    color: #d4d4d8;
    .erp-panel-header { color: #f43f5e; }
  }

  .erp-toggle-diagnostics-btn {
    color: #f43f5e;
    &:hover { background-color: rgba(244, 63, 94, 0.1); }
  }

  .erp-diagnostics-details-box {
    background-color: #000000;
    color: #e4e4e7;
    border-inline-start: 3px solid #f43f5e;
  }

  .erp-dialog-footer-wrapper {
    background-color: #09090b;
    border-top: 1px solid #27272a;
  }

  .erp-header-close-btn {
    color: #a1a1aa;
    &:hover { background-color: #18181b; color: #f4f4f5; }
  }
}

// Theme Sleek (High-Fidelity Modern Glassmorphism)
.erp-theme-sleek {
  background-color: rgba(11, 13, 19, 0.9);
  backdrop-filter: blur(20px);
  color: #f5f3ff;
  border: 1px solid rgba(99, 102, 241, 0.25);
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 40px rgba(99, 102, 241, 0.15);

  .erp-dialog-header-wrapper {
    background-color: rgba(99, 102, 241, 0.05);
    border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  }

  .erp-header-badge {
    background-color: rgba(99, 102, 241, 0.12);
    color: #a5b4fc;
    border: 1px solid rgba(99, 102, 241, 0.3);
  }

  .erp-subtitle-text { color: #818cf8; }
  .erp-message-text { color: #e0e7ff; }

  .erp-records-warning-panel {
    background-color: rgba(11, 13, 19, 0.6);
    border: 1px solid rgba(99, 102, 241, 0.15);
    color: #e0e7ff;
    .erp-panel-header { color: #a5b4fc; }
  }

  .erp-toggle-diagnostics-btn {
    color: #a5b4fc;
    &:hover { background-color: rgba(99, 102, 241, 0.1); }
  }

  .erp-diagnostics-details-box {
    background-color: rgba(0, 0, 0, 0.4);
    color: #c7d2fe;
    border-inline-start: 3px solid #6366f1;
  }

  .erp-dialog-footer-wrapper {
    background-color: rgba(11, 13, 19, 0.8);
    border-top: 1px solid rgba(99, 102, 241, 0.15);
  }

  .erp-header-close-btn {
    color: #818cf8;
    &:hover { background-color: rgba(99, 102, 241, 0.15); color: #f5f3ff; }
  }
}

// ------------------------------------------
// STRUCTURAL CONTAINER STYLES (targeted by ID)
// ------------------------------------------

#\${config.headerId || 'erp-dialog-header'} {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 1.25rem;
  gap: 1rem;

  .erp-header-content-left {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .erp-header-icon-box {
    padding: 0.65rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    .icon-svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .erp-header-titles {
    display: flex;
    flex-direction: column;
  }

  .erp-title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .erp-title-text {
    font-size: 1.125rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin: 0;
    line-height: 1.2;
  }

  .erp-header-badge {
    font-size: 0.625rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
  }

  .erp-subtitle-text {
    font-size: 0.75rem;
    margin-top: 0.25rem;
    font-weight: 500;
  }

  .erp-header-close-btn {
    padding: 0.4rem;
    border-radius: 6px;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.15s ease-in-out;
  }
}

#\${config.bodyId || 'erp-dialog-body'} {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .erp-message-text {
    font-size: 0.875rem;
    line-height: 1.5;
    margin: 0;

    &.align-center { text-align: center; }
    &.align-left { text-align: start; }
  }

  .erp-records-warning-panel {
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    .erp-panel-header {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;

      .erp-panel-icon { opacity: 0.9; }
    }

    .erp-records-list {
      margin: 0;
      padding: 0;
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    .erp-record-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;

      .arrow-icon {
        opacity: 0.6;
        flex-shrink: 0;
        transition: transform 0.2s ease;
        
        [dir="rtl"] & {
          transform: scaleX(-1);
        }
      }
    }
  }

  .erp-diagnostics-container {
    padding-top: 0.5rem;

    .erp-toggle-diagnostics-btn {
      display: flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.4rem 0.6rem;
      border-radius: 4px;
      border: none;
      background: transparent;
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      .chevron-icon { transition: transform 0.2s ease-in-out; }
    }

    .erp-diagnostics-details-box {
      margin-top: 0.5rem;
      padding: 0.75rem;
      border-radius: 6px;
      overflow-x: auto;

      pre {
        margin: 0;
        font-family: 'Courier New', Courier, monospace;
        font-size: 0.75rem;
        line-height: 1.4;
        white-space: pre-wrap;
      }
    }
  }
}

#\${config.footerId || 'erp-dialog-footer'} {
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;

  .erp-footer-actions-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: auto;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: stretch;

    .erp-btn-aux { order: 3; }
    
    .erp-footer-actions-right {
      flex-direction: column;
      align-items: stretch;
      width: 100%;
    }
  }
}

// ------------------------------------------
// BUTTON BASE STYLES & VARIANTS
// ------------------------------------------

.erp-btn-base {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease-in-out;

  &:disabled {
    opacity: 0.5 !important;
    cursor: not-allowed !important;
  }

  @media (max-width: 640px) {
    width: 100%;
  }

  .spinner {
    width: 0.875rem;
    height: 0.875rem;
    animation: erp-spin 1s linear infinite;
    stroke: currentColor;
  }
}

// Logical margins for auxiliary action button placement
.erp-btn-aux {
  margin-inline-end: auto;
}

// Button color themes
.erp-btn-primary {
  background-color: #2563eb;
  color: #ffffff;
  &:hover:not(:disabled) { background-color: #1d4ed8; }
}

.erp-btn-danger {
  background-color: #dc2626;
  color: #ffffff;
  &:hover:not(:disabled) { background-color: #b91c1c; }
}

.erp-btn-warning {
  background-color: #d97706;
  color: #ffffff;
  &:hover:not(:disabled) { background-color: #b45309; }
}

.erp-btn-success {
  background-color: #059669;
  color: #ffffff;
  &:hover:not(:disabled) { background-color: #047857; }
}

.erp-btn-secondary {
  background-color: #3f3f46;
  color: #e4e4e7;
  border: 1px solid #52525b;
  &:hover:not(:disabled) { background-color: #27272a; }
}

.erp-btn-outline {
  background-color: transparent;
  color: #a1a1aa;
  border: 1px solid #27272a;
  &:hover:not(:disabled) {
    background-color: rgba(255, 255, 255, 0.05);
    color: #f4f4f5;
  }
}

// ------------------------------------------
// MICRO-ANIMATIONS KEYFRAMES
// ------------------------------------------

.erp-anim-pulse {
  animation: erp-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.erp-anim-spin {
  animation: erp-spin 6s linear infinite;
}

.erp-anim-bounce {
  animation: erp-bounce 1s infinite;
}

@keyframes erp-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: .7; transform: scale(0.96); }
}

@keyframes erp-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes erp-bounce {
  0%, 100% { transform: translateY(0); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: translateY(-15%); animation-timing-function: cubic-bezier(0,0,0.2,1); }
}
`;

  // React Implementation
  const react = `import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, Trash2, AlertTriangle, ShieldAlert } from 'lucide-react';

export type DialogTheme = 'light' | 'dark' | 'slate' | 'amber' | 'sleek';
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

export interface ERPConfirmDialogProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  badgeText?: string;
  showBadge?: boolean;
  headerId?: string;

  icon?: DialogIconType;
  iconColor?: string;
  iconBgColor?: string;
  iconAnimation?: 'none' | 'pulse' | 'spin' | 'bounce';
  iconId?: string;

  message: string;
  detailedMessage?: string;
  showDetailsByDefault?: boolean;
  affectedRecords?: string[];
  bodyId?: string;

  confirmBtn?: Partial<ButtonConfig>;
  cancelBtn?: Partial<ButtonConfig>;
  auxBtn?: Partial<ButtonConfig>;
  footerId?: string;

  theme?: DialogTheme;
  width?: DialogWidth;
  customWidth?: string;
  zIndex?: number;
  borderRadius?: string;
  overlayOpacity?: number;
  overlayBlur?: string;
  align?: 'left' | 'center';
  dir?: 'ltr' | 'rtl';
  dialogId?: string;
  overlayId?: string;

  animationType?: DialogAnimation;
  animationDuration?: number; // ms
  animationEasing?: 'ease-out' | 'ease-in-out' | 'elastic' | 'linear';

  onConfirm: () => void;
  onCancel: () => void;
  onAux?: () => void;
  onClose?: () => void;
}

const iconMap = {
  alert: ShieldAlert,
  check: CheckCircle,
  info: Info,
  trash: Trash2,
  warning: AlertTriangle,
  shield: AlertTriangle,
};

export const ERPConfirmDialog: React.FC<ERPConfirmDialogProps> = ({
  isOpen,
  title = '${config.title.replace(/'/g, "\\'")}',
  subtitle = '${config.subtitle.replace(/'/g, "\\'")}',
  badgeText = '${config.badgeText.replace(/'/g, "\\'")}',
  showBadge = ${config.showBadge},
  headerId = '${config.headerId}',
  icon = '${config.icon}',
  iconColor = '${config.iconColor}',
  iconBgColor = '${config.iconBgColor}',
  iconAnimation = '${config.iconAnimation}',
  iconId = '${config.iconId}',
  message,
  detailedMessage = \`${config.detailedMessage.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`,
  showDetailsByDefault = false,
  affectedRecords = ${JSON.stringify(config.affectedRecords)},
  bodyId = '${config.bodyId}',
  confirmBtn,
  cancelBtn,
  auxBtn,
  footerId = '${config.footerId}',
  theme = '${config.theme}',
  width = '${config.width}',
  customWidth = '${config.customWidth}',
  zIndex = ${config.zIndex},
  borderRadius = '${config.borderRadius}',
  overlayOpacity = ${config.overlayOpacity},
  overlayBlur = '${config.overlayBlur}',
  align = '${config.align}',
  dir = '${config.dir || 'ltr'}',
  dialogId = '${config.dialogId}',
  overlayId = '${config.overlayId}',
  animationType = '${config.animationType}',
  animationDuration = ${config.animationDuration},
  animationEasing = '${config.animationEasing}',
  onConfirm,
  onCancel,
  onAux,
  onClose,
}) => {
  const [showDetails, setShowDetails] = React.useState(showDetailsByDefault);
  const SelectedIcon = iconMap[icon] || AlertTriangle;

  const confirmFull: ButtonConfig = {
    text: 'Confirm',
    variant: 'primary',
    show: true,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-confirm-btn',
    ...confirmBtn,
  };

  const cancelFull: ButtonConfig = {
    text: 'Cancel',
    variant: 'outline',
    show: true,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-cancel-btn',
    ...cancelBtn,
  };

  const auxFull: ButtonConfig = {
    text: 'Help',
    variant: 'secondary',
    show: false,
    disabled: false,
    loading: false,
    customId: 'erp-dialog-aux-btn',
    ...auxBtn,
  };

  // Build entry transition
  const getVariants = () => {
    const d = animationDuration / 1000;
    const ease = animationEasing === 'elastic' ? [0.175, 0.885, 0.32, 1.275] : 'easeOut';
    
    switch (animationType) {
      case 'slide-up':
        return {
          initial: { opacity: 0, y: 50, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { duration: d, ease } },
          exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } },
        };
      case 'slide-down':
        return {
          initial: { opacity: 0, y: -50, scale: 0.96 },
          animate: { opacity: 1, y: 0, scale: 1, transition: { duration: d, ease } },
          exit: { opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.2 } },
        };
      case 'fade':
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1, transition: { duration: d, ease } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        };
      case 'rotate-in':
        return {
          initial: { opacity: 0, scale: 0.8, rotate: -4 },
          animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: d, ease } },
          exit: { opacity: 0, scale: 0.85, rotate: 2, transition: { duration: 0.2 } },
        };
      case 'scale':
      default:
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1, transition: { duration: d, ease } },
          exit: { opacity: 0, scale: 0.92, transition: { duration: 0.18 } },
        };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id={overlayId}
          className="erp-dialog-overlay-backdrop"
          dir={dir}
          style={{
            zIndex,
            backgroundColor: \`rgba(0, 0, 0, \${overlayOpacity})\`,
            backdropFilter: \`blur(\${overlayBlur})\`,
          }}
          onClick={onCancel}
        >
          <motion.div
            id={dialogId}
            variants={getVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ borderRadius, ...(width === 'custom' ? { width: customWidth } : {}) }}
            className={\`erp-dialog-card-container erp-theme-\${theme} erp-width-\${width}\`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div id={headerId} className="erp-dialog-header-wrapper">
              <div className="erp-header-content-left" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                <div
                  id={iconId}
                  className={\`erp-header-icon-box erp-anim-\${iconAnimation}\`}
                  style={{ backgroundColor: iconBgColor, color: iconColor }}
                >
                  {icon === 'trash' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="icon-svg"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>}
                  {icon === 'check' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="icon-svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
                  {icon === 'info' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="icon-svg"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>}
                  {icon === 'warning' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="icon-svg"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>}
                  {icon === 'shield' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="icon-svg"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                </div>

                <div className="erp-header-titles">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <h3 className="erp-title-text">{title}</h3>
                    {showBadge && badgeText && (
                      <span className="erp-header-badge">
                        {badgeText}
                      </span>
                    )}
                  </div>
                  <p className="erp-subtitle-text">{subtitle}</p>
                </div>
              </div>

              {onClose && (
                <button onClick={onClose} className="erp-close-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  &times;
                </button>
              )}
            </div>

            {/* Body */}
            <div id={bodyId} className="erp-dialog-body-wrapper">
              <p className={\`erp-message-text align-\${align}\`}>{message}</p>

              {affectedRecords && affectedRecords.length > 0 && (
                <div className="erp-records-warning-panel">
                  <div className="erp-panel-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="erp-panel-icon"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M3 11h18"/><path d="M12 22a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="m19 19-4-4"/></svg>
                    <span>Impacted Ledger Objects ({affectedRecords.length})</span>
                  </div>
                  <ul className="erp-records-list">
                    {affectedRecords.map((record, i) => (
                      <li key={i} className="erp-record-item">
                        <svg className="arrow-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        <span>{record}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {detailedMessage && (
                <div className="erp-diagnostics-container">
                  <button className="erp-toggle-diagnostics-btn" onClick={() => setShowDetails(!showDetails)}>
                    <span>{showDetails ? 'Hide' : 'Show'} ERP Diagnostics & Metadata</span>
                    <svg style={{ transform: showDetails ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  
                  {showDetails && (
                    <div className="erp-diagnostics-details-box">
                      <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{detailedMessage}</pre>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div id={footerId} className="erp-dialog-footer-wrapper">
              {auxFull.show && (
                <button id={auxFull.customId} onClick={onAux} className="erp-btn-base erp-btn-aux erp-btn-secondary" disabled={auxFull.disabled || auxFull.loading}>
                  {auxFull.loading && <span className="erp-spinner" />}
                  <span>{auxFull.text}</span>
                </button>
              )}
              <div className="erp-footer-actions-right">
                {cancelFull.show && (
                  <button id={cancelFull.customId} onClick={onCancel} className={\`erp-btn-base erp-btn-\${cancelFull.variant}\`} disabled={cancelFull.disabled || cancelFull.loading}>
                    {cancelFull.loading && <span className="erp-spinner" />}
                    <span>{cancelFull.text}</span>
                  </button>
                )}
                {confirmFull.show && (
                  <button id={confirmFull.customId} onClick={onConfirm} className={\`erp-btn-base erp-btn-\${confirmFull.variant}\`} disabled={confirmFull.disabled || confirmFull.loading}>
                    {confirmFull.loading && <span className="erp-spinner" />}
                    <span>{confirmFull.text}</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
`;

  return { ts, html, scss, react };
}
