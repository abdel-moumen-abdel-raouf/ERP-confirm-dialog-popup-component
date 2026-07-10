import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Settings,
  Code,
  Smartphone,
  Monitor,
  Play,
  Terminal,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  Layers,
  HelpCircle,
  Activity,
  Sliders,
  Palette,
  Layout,
  Type,
  Maximize2,
  FileText,
  BadgeAlert,
  ChevronRight,
  Database,
  ArrowRight
} from 'lucide-react';
import { DialogConfig, DialogPreset } from './types';
import { DEFAULT_DIALOG_CONFIG, DIALOG_PRESETS } from './constants';
import { ERPConfirmDialog } from './components/ERPConfirmDialog';
import { generateCodeTemplates } from './utils/angularCodeGen';

export default function App() {
  // Config state
  const [config, setConfig] = useState<DialogConfig>(DEFAULT_DIALOG_CONFIG);
  
  // Custom record inputs
  const [newRecordInput, setNewRecordInput] = useState('');
  
  // Active Preset name
  const [activePreset, setActivePreset] = useState<string>('Critical Audit Deletion');

  // UI state
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [isInlineOpen, setIsInlineOpen] = useState(true);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'content' | 'buttons' | 'styling' | 'ids' | 'animations'>('content');
  const [activeCodeTab, setActiveCodeTab] = useState<'ts' | 'html' | 'scss' | 'react'>('ts');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Auto-open inline emulation when config is modified
  useEffect(() => {
    setIsInlineOpen(true);
  }, [config]);

  // ERP Audit Logs console state
  const [logs, setLogs] = useState<Array<{ id: string; time: string; text: string; type: 'info' | 'success' | 'warn' | 'error' }>>([
    {
      id: 'init',
      time: new Date().toLocaleTimeString(),
      text: 'ERP Dialog Compiler Engine initialized. Waiting for transaction events...',
      type: 'info',
    },
  ]);

  // Load first preset on mount
  useEffect(() => {
    applyPreset(DIALOG_PRESETS[0]);
  }, []);

  // Logger helper
  const addLog = (text: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const newLog = {
      id: Math.random().toString(36).substring(2, 9),
      time: new Date().toLocaleTimeString(),
      text,
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]); // Keep last 20 logs
  };

  const applyPreset = (preset: DialogPreset) => {
    const mergedConfig = {
      ...DEFAULT_DIALOG_CONFIG,
      ...preset.config,
      // Merge sub-objects carefully
      confirmBtn: { ...DEFAULT_DIALOG_CONFIG.confirmBtn, ...preset.config.confirmBtn },
      cancelBtn: { ...DEFAULT_DIALOG_CONFIG.cancelBtn, ...preset.config.cancelBtn },
      auxBtn: { ...DEFAULT_DIALOG_CONFIG.auxBtn, ...preset.config.auxBtn },
    };
    setConfig(mergedConfig);
    setActivePreset(preset.name);
    addLog(`Applied ERP template preset: "${preset.name}"`, 'success');
  };

  const resetToDefault = () => {
    setConfig(DEFAULT_DIALOG_CONFIG);
    setActivePreset('Default Verification');
    addLog('Reset configuration parameters to absolute defaults.', 'info');
  };

  const handleCopyCode = (code: string, label: string) => {
    navigator.clipboard.writeText(code);
    setCopiedText(label);
    addLog(`Copied ${label} file content to system clipboard.`, 'success');
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Record mutators
  const addRecord = () => {
    if (!newRecordInput.trim()) return;
    if (config.affectedRecords.includes(newRecordInput.trim())) {
      addLog(`Record "${newRecordInput.trim()}" is already present in the list.`, 'warn');
      return;
    }
    setConfig(prev => ({
      ...prev,
      affectedRecords: [...prev.affectedRecords, newRecordInput.trim()]
    }));
    addLog(`Added affected object: "${newRecordInput.trim()}"`, 'info');
    setNewRecordInput('');
  };

  const removeRecord = (indexToRemove: number) => {
    const removedItem = config.affectedRecords[indexToRemove];
    setConfig(prev => ({
      ...prev,
      affectedRecords: prev.affectedRecords.filter((_, idx) => idx !== indexToRemove)
    }));
    addLog(`Removed affected object: "${removedItem}"`, 'warn');
  };

  // Generate Angular / SCSS templates based on current config state
  const templates = generateCodeTemplates(config);

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* HEADER BAR */}
      <header className="border-b border-[#1F232E] bg-[#0F1115]/80 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/10">
            <Layers className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                ERP Confirm Dialog Studio
              </h1>
              <span className="text-[10px] bg-indigo-950 text-indigo-400 font-extrabold tracking-widest px-2 py-0.5 rounded border border-indigo-900/40">
                ANGULAR & SCSS GENERATOR
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Interactive high-fidelity customizer, breakpoint testing frame & full-scale modal analyzer
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={resetToDefault}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1F232E] hover:border-slate-700 bg-[#15171C] hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all"
            title="Restore initial values"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={() => {
              setIsFullscreenOpen(true);
              addLog('Launched live full-screen Modal Sandbox.', 'info');
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-xs font-bold text-white shadow-lg shadow-indigo-600/15 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Fullscreen Preview</span>
          </button>
        </div>
      </header>

      {/* WORKSPACE CONTENT */}
      <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 overflow-hidden h-[calc(100vh-73px)]">
        
        {/* LEFT PANEL: PRESETS & DETAILED CUSTOMIZATION (4/12 width) */}
        <div className="xl:col-span-4 border-r border-[#1F232E] flex flex-col overflow-y-auto bg-[#15171C]/40 divide-y divide-[#1F232E]">
          
          {/* Section: Templates presets */}
          <div className="p-5">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              ERP Core Workflow Templates
            </h2>
            <div className="grid grid-cols-1 gap-2.5">
              {DIALOG_PRESETS.map((preset) => {
                const isSelected = activePreset === preset.name;
                return (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                      isSelected
                        ? 'bg-[#1D2028] border-indigo-500/90 shadow-lg shadow-indigo-500/10'
                        : 'bg-[#15171C] border-[#1F232E] hover:border-[#2D3344] hover:bg-[#1C1F26]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors">
                        {preset.name}
                      </div>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section: Dynamic Config tabs */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Tabs Selector */}
            <div className="grid grid-cols-5 bg-[#0F1115] border-b border-[#1F232E] sticky top-0 z-10 text-center">
              {[
                { id: 'content', label: 'Header', icon: Type },
                { id: 'buttons', label: 'Footer', icon: Sliders },
                { id: 'styling', label: 'Styles', icon: Palette },
                { id: 'ids', label: 'DOM IDs', icon: Layers },
                { id: 'animations', label: 'Animate', icon: Layout },
              ].map((tab) => {
                const IconComp = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3 text-[10px] font-bold tracking-wider uppercase flex flex-col items-center gap-1.5 transition-all border-b-2 ${
                      isSelected
                        ? 'text-indigo-400 border-indigo-500 bg-[#15171C]/60'
                        : 'text-slate-500 border-transparent hover:text-slate-300 hover:bg-[#15171C]/20'
                    }`}
                  >
                    <IconComp className="w-4 h-4 shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Controls Content */}
            <div className="p-5 flex-1 overflow-y-auto space-y-5">
              
              {/* TAB: CONTENT & HEADER */}
              {activeTab === 'content' && (
                <div className="space-y-4">
                  {/* Title & Badge */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Dialog Primary Title
                    </label>
                    <input
                      type="text"
                      value={config.title}
                      onChange={(e) => {
                        setConfig(prev => ({ ...prev, title: e.target.value }));
                        addLog(`Modified title to: "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Subtitle / Department Tagline
                    </label>
                    <input
                      type="text"
                      value={config.subtitle}
                      onChange={(e) => setConfig(prev => ({ ...prev, subtitle: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-end">
                    <div className="col-span-8">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Security Badge Text
                      </label>
                      <input
                        type="text"
                        value={config.badgeText}
                        onChange={(e) => setConfig(prev => ({ ...prev, badgeText: e.target.value }))}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="col-span-4 pb-2">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
                        <input
                          type="checkbox"
                          checked={config.showBadge}
                          onChange={(e) => setConfig(prev => ({ ...prev, showBadge: e.target.checked }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                        />
                        <span>Show Badge</span>
                      </label>
                    </div>
                  </div>

                  {/* Icon Customizer */}
                  <div className="p-3.5 bg-[#15171C]/50 rounded-xl border border-[#1F232E] space-y-3.5">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Header Icon Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Icon Symbol
                        </label>
                        <select
                          value={config.icon}
                          onChange={(e) => {
                            setConfig(prev => ({ ...prev, icon: e.target.value as any }));
                            addLog(`Changed header icon symbol to "${e.target.value}"`, 'info');
                          }}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="warning">Warning (Triangle)</option>
                          <option value="trash">Danger (Trash Bin)</option>
                          <option value="check">Success (Checked Circle)</option>
                          <option value="info">Information (Circle i)</option>
                          <option value="shield">Critical (Shield Alert)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Icon Animation
                        </label>
                        <select
                          value={config.iconAnimation}
                          onChange={(e) => setConfig(prev => ({ ...prev, iconAnimation: e.target.value as any }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="none">None (Static)</option>
                          <option value="pulse">Pulse (Soft scale)</option>
                          <option value="spin">Spin (Rotator)</option>
                          <option value="bounce">Bounce (Attention)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Icon Color (Hex)
                        </label>
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="color"
                            value={config.iconColor}
                            onChange={(e) => setConfig(prev => ({ ...prev, iconColor: e.target.value }))}
                            className="w-8 h-8 rounded border-none bg-transparent cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={config.iconColor}
                            onChange={(e) => setConfig(prev => ({ ...prev, iconColor: e.target.value }))}
                            className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2 py-1.5 text-xs font-mono text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                          Icon BG Color (Hex)
                        </label>
                        <div className="flex gap-1.5 items-center">
                          <input
                            type="color"
                            value={config.iconBgColor}
                            onChange={(e) => setConfig(prev => ({ ...prev, iconBgColor: e.target.value }))}
                            className="w-8 h-8 rounded border-none bg-transparent cursor-pointer shrink-0"
                          />
                          <input
                            type="text"
                            value={config.iconBgColor}
                            onChange={(e) => setConfig(prev => ({ ...prev, iconBgColor: e.target.value }))}
                            className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2 py-1.5 text-xs font-mono text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Confirm Body Message
                    </label>
                    <textarea
                      value={config.message}
                      onChange={(e) => setConfig(prev => ({ ...prev, message: e.target.value }))}
                      rows={3}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-normal"
                    />
                  </div>

                  {/* Bullet / Record Inputs */}
                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Affected Database Records List
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. Purchase Order #PO-841"
                        value={newRecordInput}
                        onChange={(e) => setNewRecordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addRecord()}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                      />
                      <button
                        onClick={addRecord}
                        className="px-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-semibold text-white flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-1.5 max-h-36 overflow-y-auto pt-1">
                      {config.affectedRecords.map((rec, index) => (
                        <div key={index} className="flex items-center justify-between p-1.5 bg-[#0F1115] border border-[#1F232E] rounded-lg text-xs text-slate-300">
                          <span className="truncate font-mono text-[11px] max-w-[85%]">{rec}</span>
                          <button
                            onClick={() => removeRecord(index)}
                            className="p-1 hover:bg-rose-950 hover:text-rose-400 rounded transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                      {config.affectedRecords.length === 0 && (
                        <div className="text-center p-3 text-slate-500 text-xs italic">
                          No affected objects listed
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Metadata and technical debug stack */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Diagnostics Technical Metadata
                    </label>
                    <textarea
                      value={config.detailedMessage}
                      onChange={(e) => setConfig(prev => ({ ...prev, detailedMessage: e.target.value }))}
                      rows={3}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-3 py-2 text-xs font-mono text-indigo-300 focus:outline-none focus:border-indigo-500 leading-normal"
                      placeholder="Add system status, operator permissions, stack trace details..."
                    />
                  </div>
                </div>
              )}

              {/* TAB: BUTTONS & FOOTER */}
              {activeTab === 'buttons' && (
                <div className="space-y-5">
                  {/* Confirm Button Customization */}
                  <div className="p-4 bg-[#15171C]/50 border border-[#1F232E] rounded-xl space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        Confirm Action Button
                      </h3>
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.confirmBtn.show}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            confirmBtn: { ...prev.confirmBtn, show: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Visible</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Label Text
                        </label>
                        <input
                          type="text"
                          value={config.confirmBtn.text}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            confirmBtn: { ...prev.confirmBtn, text: e.target.value }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Color Theme
                        </label>
                        <select
                          value={config.confirmBtn.variant}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            confirmBtn: { ...prev.confirmBtn, variant: e.target.value as any }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="primary">Primary (Blue)</option>
                          <option value="danger">Danger (Red)</option>
                          <option value="warning">Warning (Amber)</option>
                          <option value="success">Success (Emerald)</option>
                          <option value="secondary">Secondary (Zinc)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.confirmBtn.disabled}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            confirmBtn: { ...prev.confirmBtn, disabled: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.confirmBtn.loading}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            confirmBtn: { ...prev.confirmBtn, loading: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600"
                        />
                        <span>Loading state</span>
                      </label>
                    </div>
                  </div>

                  {/* Cancel Button Customization */}
                  <div className="p-4 bg-[#15171C]/50 border border-[#1F232E] rounded-xl space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-500" />
                        Cancel Action Button
                      </h3>
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.cancelBtn.show}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            cancelBtn: { ...prev.cancelBtn, show: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Visible</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Label Text
                        </label>
                        <input
                          type="text"
                          value={config.cancelBtn.text}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            cancelBtn: { ...prev.cancelBtn, text: e.target.value }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Color Theme
                        </label>
                        <select
                          value={config.cancelBtn.variant}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            cancelBtn: { ...prev.cancelBtn, variant: e.target.value as any }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="outline">Outline (Border)</option>
                          <option value="secondary">Secondary (Zinc)</option>
                          <option value="primary">Primary (Blue)</option>
                          <option value="danger">Danger (Red)</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.cancelBtn.disabled}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            cancelBtn: { ...prev.cancelBtn, disabled: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600"
                        />
                        <span>Disabled</span>
                      </label>

                      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.cancelBtn.loading}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            cancelBtn: { ...prev.cancelBtn, loading: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600"
                        />
                        <span>Loading state</span>
                      </label>
                    </div>
                  </div>

                  {/* Auxiliary Third Action Button */}
                  <div className="p-4 bg-[#15171C]/50 border border-[#1F232E] rounded-xl space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        Auxiliary Action Button
                      </h3>
                      <label className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase cursor-pointer">
                        <input
                          type="checkbox"
                          checked={config.auxBtn.show}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            auxBtn: { ...prev.auxBtn, show: e.target.checked }
                          }))}
                          className="rounded border-[#1F232E] bg-[#0F1115] text-indigo-600 focus:ring-indigo-500"
                        />
                        <span>Visible</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Label Text
                        </label>
                        <input
                          type="text"
                          value={config.auxBtn.text}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            auxBtn: { ...prev.auxBtn, text: e.target.value }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 mb-1">
                          Color Theme
                        </label>
                        <select
                          value={config.auxBtn.variant}
                          onChange={(e) => setConfig(prev => ({
                            ...prev,
                            auxBtn: { ...prev.auxBtn, variant: e.target.value as any }
                          }))}
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-xs text-slate-200 focus:outline-none"
                        >
                          <option value="secondary">Secondary (Zinc)</option>
                          <option value="outline">Outline (Border)</option>
                          <option value="primary">Primary (Blue)</option>
                          <option value="warning">Warning (Amber)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: STYLING & TRANSITIONS */}
              {activeTab === 'styling' && (
                <div className="space-y-4">
                  {/* Theme Selector */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      ERP Visual Theme Preset
                    </label>
                    <select
                      value={config.theme}
                      onChange={(e) => {
                        setConfig(prev => ({ ...prev, theme: e.target.value as any }));
                        addLog(`Switched visual theme to: "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="dark">Charcoal Black Theme (Default Dark)</option>
                      <option value="slate">Cobalt Slate Theme (Professional High-Tech)</option>
                      <option value="amber">Advisory Amber Theme (Audit Warning Alert)</option>
                      <option value="light">Glacier Light Theme (Standard Enterprise ERP)</option>
                    </select>
                  </div>

                  {/* Width settings */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Dialog Width Unit
                      </label>
                      <select
                        value={config.width}
                        onChange={(e) => {
                          setConfig(prev => ({ ...prev, width: e.target.value as any }));
                          addLog(`Set dialog width category to: "${e.target.value}"`, 'info');
                        }}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2 text-xs text-white focus:outline-none"
                      >
                        <option value="sm">Small (440px max)</option>
                        <option value="md">Medium (540px max)</option>
                        <option value="lg">Large (680px max)</option>
                        <option value="xl">Extra Large (900px max)</option>
                        <option value="custom">Custom Specification</option>
                      </select>
                    </div>

                    {config.width === 'custom' && (
                      <div>
                        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Custom Width Value
                        </label>
                        <input
                          type="text"
                          value={config.customWidth}
                          onChange={(e) => setConfig(prev => ({ ...prev, customWidth: e.target.value }))}
                          placeholder="e.g. 580px or 75%"
                          className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {/* Direction (LTR / RTL) */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Text Direction & Layout Flow (الاتجاه)
                    </label>
                    <select
                      value={config.dir}
                      onChange={(e) => {
                        setConfig(prev => ({ ...prev, dir: e.target.value as any }));
                        addLog(`Set layout flow direction to: "${e.target.value.toUpperCase()}"`, 'info');
                      }}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ltr">Left-to-Right (LTR / اليسار إلى اليمين)</option>
                      <option value="rtl">Right-to-Left (RTL / اليمين إلى اليسار)</option>
                    </select>
                  </div>

                  {/* Alignment */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Main Body Text Alignment
                    </label>
                    <select
                      value={config.align}
                      onChange={(e) => setConfig(prev => ({ ...prev, align: e.target.value as any }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2 text-xs text-white focus:outline-none"
                    >
                      <option value="left">Left-aligned (Recommended for long text)</option>
                      <option value="center">Center-aligned (For brief alerts)</option>
                    </select>
                  </div>

                  {/* Z-Index Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Overlay Z-Index Position
                      </label>
                      <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded">
                        {config.zIndex}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={9999}
                      step={10}
                      value={config.zIndex}
                      onChange={(e) => setConfig(prev => ({ ...prev, zIndex: Number(e.target.value) }))}
                      className="w-full accent-indigo-500 h-1 bg-[#1F232E] rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[9px] text-slate-500 block mt-1">
                      Configures stacking context to overlay other ERP portals correctly. Default: 1000
                    </span>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Corner Border Radius
                    </label>
                    <input
                      type="text"
                      value={config.borderRadius}
                      onChange={(e) => setConfig(prev => ({ ...prev, borderRadius: e.target.value }))}
                      placeholder="e.g. 12px, 8px, 20px"
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none"
                    />
                  </div>

                  {/* Backdrop styling */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">
                          Backdrop Blur
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {config.overlayBlur}
                        </span>
                      </div>
                      <select
                        value={config.overlayBlur}
                        onChange={(e) => setConfig(prev => ({ ...prev, overlayBlur: e.target.value }))}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-xs text-white focus:outline-none"
                      >
                        <option value="0px">None (Transparent)</option>
                        <option value="2px">Subtle (2px)</option>
                        <option value="4px">Medium (4px)</option>
                        <option value="6px">Balanced (6px)</option>
                        <option value="12px">Dense Blur (12px)</option>
                        <option value="20px">Immersive (20px)</option>
                      </select>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase">
                          Overlay Opacity
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {Math.round(config.overlayOpacity * 100)}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min={0.1}
                        max={0.95}
                        step={0.05}
                        value={config.overlayOpacity}
                        onChange={(e) => setConfig(prev => ({ ...prev, overlayOpacity: Number(e.target.value) }))}
                        className="w-full accent-indigo-500 h-1 bg-[#1F232E] rounded-lg appearance-none cursor-pointer mt-2"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: DOM CUSTOM IDS */}
              {activeTab === 'ids' && (
                <div className="space-y-4">
                  <div className="p-3 bg-indigo-950/30 border border-indigo-900/40 rounded-xl">
                    <p className="text-xs text-indigo-300 leading-relaxed">
                      <strong>Dynamic Custom IDs:</strong> Since this component is injected into an active global ERP, every element has a custom targetable ID. You can override the defaults below to match your enterprise SCSS selection criteria.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Backdrop Overlay ID
                    </label>
                    <input
                      type="text"
                      value={config.overlayId}
                      onChange={(e) => setConfig(prev => ({ ...prev, overlayId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Dialog Container ID
                    </label>
                    <input
                      type="text"
                      value={config.dialogId}
                      onChange={(e) => setConfig(prev => ({ ...prev, dialogId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Header Block ID
                    </label>
                    <input
                      type="text"
                      value={config.headerId}
                      onChange={(e) => setConfig(prev => ({ ...prev, headerId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Header Icon Container ID
                    </label>
                    <input
                      type="text"
                      value={config.iconId}
                      onChange={(e) => setConfig(prev => ({ ...prev, iconId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Body Wrapper ID
                    </label>
                    <input
                      type="text"
                      value={config.bodyId}
                      onChange={(e) => setConfig(prev => ({ ...prev, bodyId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Footer Wrapper ID
                    </label>
                    <input
                      type="text"
                      value={config.footerId}
                      onChange={(e) => setConfig(prev => ({ ...prev, footerId: e.target.value }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg px-2.5 py-1.5 text-xs font-mono text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Confirm Button ID
                      </label>
                      <input
                        type="text"
                        value={config.confirmBtn.customId}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          confirmBtn: { ...prev.confirmBtn, customId: e.target.value }
                        }))}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-[10px] font-mono text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">
                        Cancel Button ID
                      </label>
                      <input
                        type="text"
                        value={config.cancelBtn.customId}
                        onChange={(e) => setConfig(prev => ({
                          ...prev,
                          cancelBtn: { ...prev.cancelBtn, customId: e.target.value }
                        }))}
                        className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-1.5 text-[10px] font-mono text-slate-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TRANSITIONS & EASING */}
              {activeTab === 'animations' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Appear Entry Animation Style
                    </label>
                    <select
                      value={config.animationType}
                      onChange={(e) => {
                        setConfig(prev => ({ ...prev, animationType: e.target.value as any }));
                        addLog(`Modified modal entry transition to: "${e.target.value}"`, 'info');
                      }}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="scale">Smooth Scale Pop-in (Standard)</option>
                      <option value="slide-up">Slide Up from bottom</option>
                      <option value="slide-down">Slide Down from top</option>
                      <option value="rotate-in">Brutalist Rotate In (Angled tilt)</option>
                      <option value="fade">Simple Opacity Fade</option>
                    </select>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Animation Duration (ms)
                      </label>
                      <span className="text-xs font-mono font-semibold text-indigo-400 bg-indigo-950/60 px-1.5 py-0.5 rounded">
                        {config.animationDuration}ms
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1500}
                      step={50}
                      value={config.animationDuration}
                      onChange={(e) => setConfig(prev => ({ ...prev, animationDuration: Number(e.target.value) }))}
                      className="w-full accent-indigo-500 h-1 bg-[#1F232E] rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[9px] text-slate-500 mt-1">
                      <span>Snappy (100ms)</span>
                      <span>Cinematic (1500ms)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                      Animation Interpolation Curve
                    </label>
                    <select
                      value={config.animationEasing}
                      onChange={(e) => setConfig(prev => ({ ...prev, animationEasing: e.target.value as any }))}
                      className="w-full bg-[#0F1115] border border-[#1F232E] rounded-lg p-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="ease-out">Ease-Out (Clean deceleration)</option>
                      <option value="ease-in-out">Ease-In-Out (Symmetric flow)</option>
                      <option value="elastic">Elastic Spring (Playful physics bounce)</option>
                      <option value="linear">Linear (Mathematical static velocity)</option>
                    </select>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

        {/* MIDDLE PANEL: LIVE EMULATED SANDBOX PREVIEW (4/12 width) */}
        <div className="xl:col-span-4 border-r border-[#1F232E] flex flex-col bg-[#0F1115]">
          
          {/* Preview controls bar */}
          <div className="px-5 py-3 border-b border-[#1F232E] bg-[#15171C]/40 flex items-center justify-between">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-400" />
              Live Emulation Sandbox
            </h2>

            {/* Breakpoint emulation buttons */}
            <div className="flex items-center gap-1.5 bg-[#0F1115] p-0.5 rounded-lg border border-[#1F232E]">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-md transition-all ${
                  previewDevice === 'desktop'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Simulate Desktop Breakpoint"
              >
                <Monitor className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-md transition-all ${
                  previewDevice === 'mobile'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Simulate Mobile Breakpoint"
              >
                <Smartphone className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Dynamic Render Canvas Box */}
          <div className="flex-1 bg-slate-900/30 flex items-center justify-center p-6 relative overflow-hidden group">
            
            {/* Grid pattern backdrop decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

            {/* Simulated frame container */}
            <div
              className={`transition-all duration-300 relative border flex items-center justify-center bg-[#15171C] rounded-xl shadow-2xl p-4 overflow-hidden ${
                previewDevice === 'mobile'
                  ? 'w-[375px] h-[580px] border-[#1F232E]'
                  : 'w-full h-full max-h-[620px] border-transparent'
              }`}
            >
              {/* Device indicators on mobile */}
              {previewDevice === 'mobile' && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-[#0F1115] border border-[#1F232E] flex items-center justify-center z-20">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                  <span className="w-10 h-1 rounded-full bg-slate-800" />
                </div>
              )}

              {/* Dialogue Container Emulation inside the viewport */}
              {!isInlineOpen && (
                <div className="flex flex-col items-center justify-center text-center p-6 space-y-4 max-w-sm z-30 animate-in fade-in zoom-in duration-300">
                  <div className="p-4 bg-[#1C1F26] rounded-full border border-[#2D3344] text-emerald-400 shadow-xl shadow-emerald-950/20">
                    <Check className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-sm font-bold text-slate-200">Dialogue Event Handled</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      All button events, click listeners, and animations operate dynamically. Click the button below to re-render the dialog wrapper.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsInlineOpen(true);
                      addLog('Re-opened inline emulation dialog.', 'info');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-bold text-white shadow-lg shadow-indigo-600/25 transition-all active:scale-95"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-open Dialogue Emulation</span>
                  </button>
                </div>
              )}

              <div className="w-full flex items-center justify-center">
                <ERPConfirmDialog
                  isOpen={isInlineOpen}
                  isInline={true}
                  config={{
                    ...config,
                    // De-active full viewport attributes to render inside frame safely
                    zIndex: 10,
                    overlayOpacity: 0.8,
                    overlayBlur: '4px'
                  }}
                  onConfirm={() => {
                    setIsInlineOpen(false);
                    addLog(`Audit Action SUCCESS: Approved with config dialogId "${config.dialogId}"`, 'success');
                  }}
                  onCancel={() => {
                    setIsInlineOpen(false);
                    addLog(`Audit Action ABORTED: Canceled with config overlayId "${config.overlayId}"`, 'warn');
                  }}
                  onAux={() => {
                    addLog(`Auxiliary clicked: "${config.auxBtn.text}" triggered.`, 'info');
                  }}
                  onClose={() => {
                    setIsInlineOpen(false);
                    addLog('Dialog Header Close clicked.', 'warn');
                  }}
                />
              </div>

              {/* Status footer for simulated device */}
              {previewDevice === 'mobile' && (
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-600 uppercase tracking-widest pointer-events-none">
                  ERP Mobile Breakpoint Frame
                </div>
              )}
            </div>

            {/* Quick action helper overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
              <span className="text-[10px] bg-[#0F1115] text-slate-400 font-bold px-2 py-1 rounded border border-[#1F232E] pointer-events-none">
                Interactive Emulation Active
              </span>
            </div>
          </div>

          {/* Section: Dynamic Event Logs Console */}
          <div className="h-56 border-t border-[#1F232E] bg-[#0F1115] flex flex-col font-mono text-[11px]">
            <div className="px-4 py-2 border-b border-[#1F232E] bg-[#15171C]/90 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                ERP Transaction Event Logs
              </div>
              <button
                onClick={() => setLogs([])}
                className="text-[9px] font-bold text-slate-500 hover:text-slate-300"
              >
                Clear Screen
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2 select-text">
              {logs.map((log) => {
                let colorClass = 'text-slate-400';
                if (log.type === 'success') colorClass = 'text-emerald-400';
                if (log.type === 'warn') colorClass = 'text-amber-500';
                if (log.type === 'error') colorClass = 'text-rose-500';

                return (
                  <div key={log.id} className="leading-relaxed flex items-start gap-1.5">
                    <span className="text-slate-600 shrink-0 select-none">[{log.time}]</span>
                    <span className={colorClass}>{log.text}</span>
                  </div>
                );
              })}
              {logs.length === 0 && (
                <div className="text-slate-600 italic text-center pt-8">
                  Console idle. Trigger actions on the dialog to dispatch ledger events.
                </div>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT PANEL: EXPORT PORTAL / CODE GENERATOR (4/12 width) */}
        <div className="xl:col-span-4 flex flex-col overflow-hidden bg-[#0F1115]">
          
          {/* Section title */}
          <div className="px-5 py-3 border-b border-[#1F232E] bg-[#15171C]/40 flex items-center justify-between shrink-0">
            <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-400" />
              Dynamic Enterprise Exporter
            </h2>
          </div>

          {/* Code Tab Selection */}
          <div className="flex border-b border-[#1F232E] bg-[#15171C] shrink-0 text-xs">
            {[
              { id: 'ts', label: 'Controller (TS)', color: 'text-blue-400' },
              { id: 'html', label: 'Template (HTML)', color: 'text-amber-400' },
              { id: 'scss', label: 'Stylesheet (SCSS)', color: 'text-rose-400' },
              { id: 'react', label: 'React Hook version', color: 'text-sky-400' },
            ].map((codeTab) => {
              const isSelected = activeCodeTab === codeTab.id;
              return (
                <button
                  key={codeTab.id}
                  onClick={() => setActiveCodeTab(codeTab.id as any)}
                  className={`flex-1 py-3 text-center font-bold tracking-tight border-b-2 transition-all ${
                    isSelected
                      ? 'text-white border-indigo-500 bg-[#15171C]/50'
                      : 'text-slate-400 border-transparent hover:text-slate-300 hover:bg-[#15171C]/20'
                  }`}
                >
                  <span className={`${codeTab.color} mr-1`}>&bull;</span>
                  {codeTab.label}
                </button>
              );
            })}
          </div>

          {/* Active file path header bar */}
          <div className="px-5 py-2.5 bg-[#15171C]/40 border-b border-[#1F232E] text-[11px] font-mono flex items-center justify-between text-slate-400 shrink-0">
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {activeCodeTab === 'ts' && 'erp-confirm-dialog.component.ts'}
                {activeCodeTab === 'html' && 'erp-confirm-dialog.component.html'}
                {activeCodeTab === 'scss' && 'erp-confirm-dialog.component.scss'}
                {activeCodeTab === 'react' && 'ERPConfirmDialog.tsx'}
              </span>
            </div>

            <button
              onClick={() => {
                const textToCopy =
                  activeCodeTab === 'ts' ? templates.ts :
                  activeCodeTab === 'html' ? templates.html :
                  activeCodeTab === 'scss' ? templates.scss : templates.react;
                
                const label = 
                  activeCodeTab === 'ts' ? 'Angular TS' :
                  activeCodeTab === 'html' ? 'Angular HTML' :
                  activeCodeTab === 'scss' ? 'Angular SCSS' : 'React Code';

                handleCopyCode(textToCopy, label);
              }}
              className="flex items-center gap-1 bg-[#0F1115] hover:bg-[#1C1F26] text-[10px] px-2 py-1 rounded border border-[#1F232E] text-indigo-400 hover:text-indigo-300 font-bold transition-all"
            >
              {copiedText ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Code display pane */}
          <div className="flex-1 overflow-y-auto bg-[#0A0B0E] p-5 font-mono text-[11px] leading-relaxed select-text">
            {activeCodeTab === 'ts' && (
              <pre className="text-blue-300 whitespace-pre">
                {templates.ts}
              </pre>
            )}
            {activeCodeTab === 'html' && (
              <pre className="text-amber-200 whitespace-pre">
                {templates.html}
              </pre>
            )}
            {activeCodeTab === 'scss' && (
              <pre className="text-rose-300 whitespace-pre">
                {templates.scss}
              </pre>
            )}
            {activeCodeTab === 'react' && (
              <pre className="text-sky-300 whitespace-pre">
                {templates.react}
              </pre>
            )}
          </div>

          {/* Quick implementation tips footer card */}
          <div className="p-4 bg-[#15171C]/40 border-t border-[#1F232E] text-xs text-slate-400 shrink-0 space-y-1.5">
            <span className="font-bold text-slate-200 uppercase tracking-widest text-[9px] text-indigo-400 flex items-center gap-1">
              <BadgeAlert className="w-3.5 h-3.5" />
              ERP Integration Policy Guidelines
            </span>
            <p className="text-[11px] leading-relaxed">
              Use custom SCSS variables or CSS properties to bind light and dark modes dynamically. The HTML structure leverages standard Nesting selectors (e.g. <code>.erp-theme-dark</code>) mapped straight to target IDs.
            </p>
          </div>

        </div>

      </main>

      {/* FULLSCREEN REAL MODAL PREVIEW ANALYZER */}
      <AnimatePresence>
        {isFullscreenOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Dark background overlay with dynamic config attributes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                backgroundColor: `rgba(0, 0, 0, ${config.overlayOpacity})`,
                backdropFilter: `blur(${config.overlayBlur})`,
              }}
              className="absolute inset-0"
              onClick={() => {
                setIsFullscreenOpen(false);
                addLog('Fullscreen Sandbox closed by clicking background backdrop.', 'warn');
              }}
            />

            {/* Diagnostic helper coordinates floating on screen edges */}
            <div className="absolute top-4 left-6 font-mono text-[10px] text-slate-400 bg-slate-950/80 border border-slate-900 rounded-lg p-3 z-50 pointer-events-none hidden md:block space-y-1">
              <div className="font-bold text-indigo-400">Modal Diagnostic Metrics</div>
              <div>&bull; Overlay ID: <span className="text-white font-semibold">#{config.overlayId}</span></div>
              <div>&bull; Container ID: <span className="text-white font-semibold">#{config.dialogId}</span></div>
              <div>&bull; Active Z-Index: <span className="text-indigo-400 font-semibold">{config.zIndex}</span></div>
              <div>&bull; Corner Radius: <span className="text-white font-semibold">{config.borderRadius}</span></div>
              <div>&bull; Easing Mode: <span className="text-white font-semibold">{config.animationEasing}</span></div>
            </div>

            <div className="absolute top-4 right-6 z-50">
              <button
                onClick={() => {
                  setIsFullscreenOpen(false);
                  addLog('Fullscreen Sandbox dismissed.', 'info');
                }}
                className="bg-slate-950/90 border border-slate-800 hover:border-slate-700 text-xs px-3.5 py-1.5 rounded-lg text-slate-300 flex items-center gap-1 transition-all shadow-lg font-semibold"
              >
                <span>Close Preview [Esc]</span>
              </button>
            </div>

            {/* Real React Confirm Dialog Component */}
            <ERPConfirmDialog
              isOpen={isFullscreenOpen}
              config={config}
              onConfirm={() => {
                setIsFullscreenOpen(false);
                addLog(`[Fullscreen action] DISPATCHED confirmation for process: "${config.title}"`, 'success');
              }}
              onCancel={() => {
                setIsFullscreenOpen(false);
                addLog('[Fullscreen action] ABORTED. Transaction rolled back safely.', 'warn');
              }}
              onAux={() => {
                addLog(`[Fullscreen action] Aux trigger clicked: "${config.auxBtn.text}"`, 'info');
              }}
              onClose={() => {
                setIsFullscreenOpen(false);
                addLog('[Fullscreen action] Dismissed by close icon.', 'warn');
              }}
            />
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
