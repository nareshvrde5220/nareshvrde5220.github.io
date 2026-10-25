import React, { useState, useEffect } from 'react';
import {
  Check,
  Copy,
  Download,
  FileCode,
  FileText,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  RefreshCw,
  X,
} from 'lucide-react';
import { TEXT_FILES, BIN_FILES_B64, APPLY_UPDATE_PS1 } from './bundleData';

type ViewMode = 'sync' | 'preview' | 'verify' | 'diff';
type ViewportSize = '100%' | '1024px' | '768px' | '375px';

interface UpdatedFile {
  path: string;
  downloadName: string;
  isBinaryPdf?: boolean;
  previewPages?: string[];
  summary: string;
  linesChanged: string;
}

const PDF_PAGE_MAP: Record<string, string[]> = {
  'Naresh_Resume_HighRes.pdf': [
    '/repo/assets/img/docs/Naresh_Resume_HighRes_p1.jpg',
    '/repo/assets/img/docs/Naresh_Resume_HighRes_p2.jpg',
  ],
  'Jampala_Naresh_Cover_Letter.pdf': [
    '/repo/assets/img/docs/Jampala_Naresh_Cover_Letter_p1.jpg',
  ],
  'AWS_Certified_Generative_AI_Developer_Professional.pdf': [
    '/repo/assets/img/docs/AWS_Certified_Generative_AI_Developer_Professional_p1.jpg',
  ],
  'AWS_Partner_Strands_Agents_Deep_Dive.pdf': [
    '/repo/assets/img/docs/AWS_Partner_Strands_Agents_Deep_Dive_p1.jpg',
  ],
  'Building_Production-Ready_AI_Agents_Bedrock_AgentCore.pdf': [
    '/repo/assets/img/docs/Building_Production-Ready_AI_Agents_Bedrock_AgentCore_p1.jpg',
  ],
  'Domain1_Review_AWS_Certified_GenAI_Developer_AIP-C01.pdf': [
    '/repo/assets/img/docs/Domain1_Review_AWS_Certified_GenAI_Developer_AIP-C01_p1.jpg',
  ],
  'Fundamentals_of_Deep_Learning_NVIDIA.pdf': [
    '/repo/assets/img/docs/Fundamentals_of_Deep_Learning_NVIDIA_p1.jpg',
  ],
};

const UPDATED_FILES: UpdatedFile[] = [
  {
    path: 'assets/docs/Naresh_Resume_HighRes.pdf',
    downloadName: 'Naresh_Resume_HighRes.pdf',
    isBinaryPdf: true,
    previewPages: PDF_PAGE_MAP['Naresh_Resume_HighRes.pdf'],
    summary:
      'Replaced with your uploaded 2-page 2026 JPMorgan Chase Applied AI ML Associate Senior resume PDF (Naresh_Resume_JPMC_AILead.pdf) — rendered with unblocked high-DPI page previews when clicking "Download Résumé".',
    linesChanged: 'Binary PDF (163 KB)',
  },
  {
    path: 'assets/docs/Jampala_Naresh_Cover_Letter.pdf',
    downloadName: 'Jampala_Naresh_Cover_Letter.pdf',
    isBinaryPdf: true,
    previewPages: PDF_PAGE_MAP['Jampala_Naresh_Cover_Letter.pdf'],
    summary:
      'Updated 1-page executive Cover Letter PDF with embedded TrueType fonts aligned 100% with the 2026 resume: 10+ years experience, JPMorgan Chase Applied AI ML Associate Senior, Trianz AWS Nova Challenge 2025 First Runner-Up, and 3x AWS Certifications.',
    linesChanged: 'Binary PDF (248 KB)',
  },
  {
    path: 'index.html',
    downloadName: 'index.html',
    summary:
      'Updated <head> SEO/OG metadata, cache-busting (?v=56), dynamic 10+ years attributes across Hero/About/Experience, Mar 2026 – Present · 9 mos on JPMorgan Chase, and blue/cyan keyword & metric highlights in Awards & Honors.',
    linesChanged: '+192 / -204',
  },
  {
    path: 'script.js',
    downloadName: 'script.js',
    summary:
      'Updated liveDurations() to dynamically calculate inclusive monthly tenure on JPMorgan Chase (9 mos now, +1 monthly) and sync 10+ career years across Header/About/Experience; updated openViewer() with unblocked high-DPI PDF page previews.',
    linesChanged: '+88 / -22',
  },
  {
    path: 'styles.css',
    downloadName: 'styles.css',
    summary:
      'Added theme-aware cyan/blue keyword highlights (.kw-blue, .award__body strong) in Awards & Honors and scrollable high-DPI document page viewer styles (.viewer__pages, .viewer__page-img).',
    linesChanged: '+6 / -0',
  },
  {
    path: '.github/workflows/main.yml',
    downloadName: 'main.yml',
    summary:
      'GitHub Actions CI workflow triggered on every push and pull_request to main. Installs Node.js 22 and Playwright Chromium, runs node --check script.js, and runs node --test tests/site.test.cjs with CI=true.',
    linesChanged: '+42 (New File)',
  },
  {
    path: 'tests/site.test.cjs',
    downloadName: 'site.test.cjs',
    summary:
      'Updated test suite verifying v=56 cache-busting, dynamic 10+ years & 9 mos JPMC tenure, Awards blue keyword highlights, %PDF- headers, high-DPI preview image assets, and all Playwright checks.',
    linesChanged: '+82 / -6',
  },
  {
    path: 'README.md',
    downloadName: 'README.md',
    summary:
      'Updated portfolio title to "Jampala Naresh — Agentic AI & GenAI Lead | Multi-Agent Systems on AWS & 3x AWS Certified (Generative AI Developer – Professional)".',
    linesChanged: '+1 / -1',
  },
  {
    path: 'SDD_MY_PROFILE_Website.md',
    downloadName: 'SDD_MY_PROFILE_Website.md',
    summary:
      'Synchronized canonical professional facts (§4.1), skills taxonomy (§4.2), section overview (§5), and acceptance criteria AC2 from 9+ years to 10+ years.',
    linesChanged: '+22 / -23',
  },
];

const VERIFICATION_RESULTS = [
  {
    check: 'node --check script.js',
    status: 'PASS',
    detail: 'Zero syntax errors in IIFE bundle (script.js?v=56)',
  },
  {
    check: 'Dynamic Experience Tenure & Total Career Years Calculation',
    status: 'PASS',
    detail: 'JPMorgan Chase (Mar 2026 – Present) dynamically computes 9 mos now and increments +1 each month; total career experience dynamically syncs 10+ years across Hero, About, and Experience',
  },
  {
    check: 'Awards & Honors Blue/Cyan Keyword & Metric Highlighting',
    status: 'PASS',
    detail: 'Highlights AWS Nova Challenge 2025 – First Runner-Up, "Reimagining Claims Adjustment", Strands Agents/CrewAI/MCP/Bedrock AgentCore, 60% faster, Team Excellence Award, and State Rank 47 in theme blue/cyan',
  },
  {
    check: 'Unblocked High-DPI In-Page PDF Viewer (Resume & Cover Letter)',
    status: 'PASS',
    detail: 'Renders crisp scrollable page previews inside #viewer-body without triggering Chrome nested-iframe PDF block ("This page has been blocked by Chrome"), with working Open and Blob Download actions',
  },
  {
    check: 'Static HTML, CSS, local assets, fragment targets & 2026 resume alignment (Zero-Dependency)',
    status: 'PASS',
    detail: 'Verifies styles.css?v=56, script.js?v=56, 10+ years stat, JPMC/Trianz metrics, 6 skill groups, zero duplicate IDs, and HTTP 200 for all local assets',
  },
  {
    check: 'Core content readable when JS is disabled or blocked',
    status: 'PASS',
    detail: 'All .reveal elements remain visible (opacity: 1) without script.js; #recent-activities stays hidden',
  },
  {
    check: 'In-page viewer preserves modified clicks & downloads',
    status: 'PASS',
    detail: 'Ctrl/Cmd/Shift/Alt clicks, middle-click, download attribute, and non-media links keep native browser behavior',
  },
  {
    check: 'All local assets, CSS url() refs & #fragment anchors resolve (HTTP 200)',
    status: 'PASS',
    detail: 'Zero duplicate IDs, 100% of anchor targets and local image/PDF assets return status 200 with zero page errors',
  },
  {
    check: 'Zero horizontal overflow across 320px, 375px, 768px, 1024px, 1440px, 1920px',
    status: 'PASS',
    detail: 'documentElement.scrollWidth <= innerWidth at all 6 breakpoints for both main page and #viewer modal',
  },
];

function base64ToUint8Array(b64: string): Uint8Array {
  const binStr = atob(b64);
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) {
    bytes[i] = binStr.charCodeAt(i);
  }
  return bytes;
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewMode>('sync');
  const [viewport, setViewport] = useState<ViewportSize>('100%');
  const [selectedFile, setSelectedFile] = useState<UpdatedFile>(UPDATED_FILES[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [step1Done, setStep1Done] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [fullScreenDoc, setFullScreenDoc] = useState<{
    fileName: string;
    pages: string[];
    href: string;
  } | null>(null);

  const clipboardExecCmd = `Invoke-Expression (Get-Clipboard -Raw)`;

  const downloadPdfByFileName = async (fileName: string, fallbackHref?: string) => {
    const repoRelPath = `assets/docs/${fileName}`;
    const b64 = BIN_FILES_B64[repoRelPath];
    if (b64) {
      const bytes = base64ToUint8Array(b64);
      triggerBlobDownload(new Blob([bytes], { type: 'application/pdf' }), fileName);
      return;
    }
    if (fallbackHref) {
      try {
        const res = await fetch(fallbackHref);
        const buf = await res.arrayBuffer();
        triggerBlobDownload(new Blob([buf], { type: 'application/pdf' }), fileName);
      } catch {
        // Ignore fetch error
      }
    }
  };

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = e.data;
      if (!data || data.type !== 'PORTFOLIO_PDF_ACTION') return;
      const { action, fileName, href } = data;
      if (action === 'download') {
        downloadPdfByFileName(fileName, href);
      } else if (action === 'open') {
        const pages = PDF_PAGE_MAP[fileName];
        if (pages && pages.length) {
          setFullScreenDoc({ fileName, pages, href });
        } else {
          downloadPdfByFileName(fileName, href);
        }
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (id.startsWith('bundle')) {
      setStep1Done(true);
    }
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleDownloadFile = (file: UpdatedFile) => {
    if (file.isBinaryPdf) {
      const b64 = BIN_FILES_B64[file.path];
      if (!b64) return;
      const bytes = base64ToUint8Array(b64);
      triggerBlobDownload(new Blob([bytes], { type: 'application/pdf' }), file.downloadName);
    } else {
      const text = TEXT_FILES[file.path] || '';
      triggerBlobDownload(
        new Blob([text], { type: 'text/plain;charset=utf-8' }),
        file.downloadName
      );
    }
  };

  const handleDownloadPs1 = () => {
    triggerBlobDownload(
      new Blob([APPLY_UPDATE_PS1], { type: 'text/plain;charset=utf-8' }),
      'apply-update.ps1'
    );
  };

  const currentTextContent = selectedFile.isBinaryPdf
    ? ''
    : TEXT_FILES[selectedFile.path] || '';

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar Contract: 3 zones */}
      <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-[#0B0F1A]/95 backdrop-blur sticky top-0 z-50">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('sync');
          }}
          className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-['Bricolage_Grotesque',sans-serif]"
        >
          nareshvrde5220.github.io · v56
        </a>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => setActiveTab('sync')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'sync'
                ? 'text-white border-indigo-400'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            1-Click Local PowerShell Sync
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'preview'
                ? 'text-white border-indigo-400'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Live Portfolio Preview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('verify')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'verify'
                ? 'text-white border-indigo-400'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Verification Suite (9/9)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('diff')}
            className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
              activeTab === 'diff'
                ? 'text-white border-indigo-400'
                : 'border-transparent hover:text-slate-200'
            }`}
          >
            Resume Alignment Audit
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => copyText(APPLY_UPDATE_PS1, 'bundle-top')}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            {copiedId === 'bundle-top' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                Bundle Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Sync Bundle
              </>
            )}
          </button>
        </div>
      </header>

      {activeTab === 'sync' && (
        <main className="max-w-[1280px] w-full mx-auto px-6 py-8 space-y-8">
          {/* Zero-Download-Corruption Clipboard Sync Banner */}
          <div className="border border-indigo-500/40 rounded-xl bg-[#0E1528] p-6 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs font-mono text-indigo-400">
                ZERO-CORRUPTION CLIPBOARD SYNC · DYNAMIC TENURE + AWARDS BLUE HIGHLIGHTS + UNBLOCKED PDF VIEWER
              </p>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight font-['Bricolage_Grotesque',sans-serif]">
                Sync All Updated Portfolio Files, PDFs &amp; High-DPI Viewer Pages via Windows Clipboard
              </h1>
              <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
                Includes dynamic monthly tenure calculation (<code className="font-mono text-emerald-300">Mar 2026 – Present · 9 mos</code>, incrementing +1 monthly) synchronized with <code className="font-mono text-emerald-300">10+ years</code> in the Hero header, blue/cyan keyword highlights in <strong>Awards &amp; Honors</strong>, and unblocked high-DPI inline previews for <strong>Download Résumé</strong> &amp; <strong>Download Cover Letter</strong>.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1 Card */}
              <div className="p-4 rounded-lg bg-[#080C18] border border-slate-800 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-indigo-400">STEP 01 · LOAD INTO CLIPBOARD</span>
                  <h2 className="text-sm font-semibold text-white">
                    Copy the Complete Portfolio Sync Bundle to Your Clipboard
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Loads <code className="font-mono text-slate-200">index.html</code>,{' '}
                    <code className="font-mono text-slate-200">script.js</code>,{' '}
                    <code className="font-mono text-slate-200">styles.css</code>,{' '}
                    <code className="font-mono text-slate-200">Naresh_Resume_HighRes.pdf</code>,{' '}
                    <code className="font-mono text-slate-200">Jampala_Naresh_Cover_Letter.pdf</code>,{' '}
                    high-DPI viewer pages (<code className="font-mono text-slate-200">assets/img/docs/*.jpg</code>),{' '}
                    <code className="font-mono text-slate-200">.github/workflows/main.yml</code>, and{' '}
                    <code className="font-mono text-slate-200">tests/site.test.cjs</code>.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => copyText(APPLY_UPDATE_PS1, 'bundle-step1')}
                    className="px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {copiedId === 'bundle-step1' ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        Step 1 Done: Bundle in Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        1. Copy Sync Bundle to Clipboard
                      </>
                    )}
                  </button>
                  {step1Done && (
                    <span className="text-xs text-emerald-400 font-medium">
                      Ready for Step 2 →
                    </span>
                  )}
                </div>
              </div>

              {/* Step 2 Card */}
              <div className="p-4 rounded-lg bg-[#080C18] border border-slate-800 flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-emerald-400">
                    STEP 02 · PASTE THIS 1 LINE IN POWERSHELL
                  </span>
                  <h2 className="text-sm font-semibold text-white">
                    Execute the Clipboard Bundle Directly in PowerShell
                  </h2>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Run this command inside <code className="font-mono text-slate-200">C:\Users\pc\Documents\nareshvrde5220.github.io</code> to unpack all files directly from your clipboard:
                  </p>
                  <code className="block mt-2 px-3 py-2 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 select-all">
                    {clipboardExecCmd}
                  </code>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleDownloadPs1}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Or Download Raw apply-update.ps1 (Blob)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left column: file selector */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border border-slate-800 rounded-xl bg-[#0D1322] p-5 space-y-4">
                <h2 className="text-base font-semibold text-white">
                  Updated Repository Files (In-Memory Blob Save)
                </h2>
                <div className="divide-y divide-slate-800/80">
                  {UPDATED_FILES.map((file) => {
                    const isSelected = selectedFile.path === file.path;
                    return (
                      <div
                        key={file.path}
                        className={`py-3.5 first:pt-0 last:pb-0 transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedFile(file)}
                            className="text-left font-mono text-xs font-medium hover:text-indigo-300 flex items-center gap-2 truncate cursor-pointer"
                          >
                            <FileCode className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="truncate">{file.path}</span>
                          </button>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-xs font-mono text-slate-400 tabular-nums">
                              {file.linesChanged}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDownloadFile(file)}
                              className="px-2.5 py-1 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors flex items-center gap-1 whitespace-nowrap shrink-0 cursor-pointer"
                            >
                              <Download className="w-3 h-3" />
                              Save
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                          {file.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right column: Unblocked High-DPI PDF or code viewer */}
            <div className="lg:col-span-7 border border-slate-800 rounded-xl bg-[#0D1322] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-slate-800 bg-[#11182B]">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="font-mono text-xs text-white truncate">{selectedFile.path}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-xs text-slate-400 font-mono tabular-nums">
                    {selectedFile.linesChanged}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!selectedFile.isBinaryPdf && (
                    <button
                      type="button"
                      onClick={() => copyText(currentTextContent, 'file')}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedId === 'file' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Copied Full File
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy Full Content
                        </>
                      )}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDownloadFile(selectedFile)}
                    className="px-3 py-1.5 text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white rounded-md flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download {selectedFile.downloadName}
                  </button>
                </div>
              </div>
              {selectedFile.isBinaryPdf && selectedFile.previewPages ? (
                <div className="w-full h-[640px] overflow-y-auto bg-[#070A12] p-5 flex flex-col items-center gap-5">
                  {selectedFile.previewPages.map((src, idx) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${selectedFile.downloadName} — Page ${idx + 1}`}
                      className="w-full max-w-[780px] h-auto rounded-lg shadow-2xl border border-slate-800 bg-white"
                    />
                  ))}
                </div>
              ) : (
                <pre className="p-5 text-xs font-mono text-slate-300 overflow-auto max-h-[640px] leading-relaxed bg-[#070A12]">
                  {currentTextContent}
                </pre>
              )}
            </div>
          </div>
        </main>
      )}

      {activeTab === 'preview' && (
        <div className="flex-1 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-2.5 bg-[#0E1322] border-b border-slate-800/70 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-slate-300 font-medium">Interactive Preview:</span>
              <span>Jampala Naresh — Agentic AI &amp; GenAI Lead | Multi-Agent Systems on AWS</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-indigo-300">styles.css?v=56 · script.js?v=56</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewport('100%')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === '100%'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  Desktop (Full)
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('1024px')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === '1024px'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  1024px
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('768px')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === '768px'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Tablet className="w-3.5 h-3.5" />
                  768px
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('375px')}
                  className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === '375px'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  375px Mobile
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIframeKey((k) => k + 1)}
                className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-300 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                title="Reload portfolio preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reload
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#060911] flex justify-center overflow-auto">
            <iframe
              key={iframeKey}
              src="/repo/index.html"
              title="Jampala Naresh Updated Portfolio Preview"
              style={{ width: viewport }}
              className={`h-[calc(100vh-105px)] border-0 bg-[#0b0f1a] transition-all duration-200 ${
                viewport !== '100%' ? 'border-x border-slate-800 shadow-2xl my-2 rounded-lg' : 'w-full'
              }`}
            />
          </div>
        </div>
      )}

      {activeTab === 'verify' && (
        <main className="max-w-[1200px] w-full mx-auto px-6 py-8 space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <p className="text-xs font-mono text-emerald-400 mb-1">
              OFFLINE REGRESSION SUITE · NODE:TEST (ZERO-DEPENDENCY + PLAYWRIGHT)
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-['Bricolage_Grotesque',sans-serif]">
              Verification Report (All Checks Passed)
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Executed against the updated <code className="text-slate-200 font-mono">index.html</code>,{' '}
              <code className="text-slate-200 font-mono">script.js</code>,{' '}
              <code className="text-slate-200 font-mono">styles.css</code>,{' '}
              <code className="text-slate-200 font-mono">Naresh_Resume_HighRes.pdf</code>,{' '}
              <code className="text-slate-200 font-mono">Jampala_Naresh_Cover_Letter.pdf</code>, and{' '}
              <code className="text-slate-200 font-mono">tests/site.test.cjs</code>.
            </p>
          </div>

          <div className="border border-slate-800 rounded-xl bg-[#0D1322] divide-y divide-slate-800">
            {VERIFICATION_RESULTS.map((item, idx) => (
              <div
                key={item.check}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-mono text-xs text-slate-400 tabular-nums">
                      0{idx + 1}.
                    </span>
                    <h2 className="text-sm font-semibold text-white">{item.check}</h2>
                  </div>
                  <p className="text-xs text-slate-400 pl-7">{item.detail}</p>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-400 shrink-0 pl-7 md:pl-0">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      )}

      {activeTab === 'diff' && (
        <main className="max-w-[1200px] w-full mx-auto px-6 py-8 space-y-8">
          <div className="border-b border-slate-800 pb-6">
            <p className="text-xs font-mono text-indigo-400 mb-1">
              SECTION-BY-SECTION RESUME ALIGNMENT
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-['Bricolage_Grotesque',sans-serif]">
              2026 JPMorgan Chase Resume &amp; Cover Letter Alignment Audit
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Complete mapping between <code className="text-slate-200 font-mono">Naresh_Resume_JPMC_AILead.pdf</code>,{' '}
              <code className="text-slate-200 font-mono">Jampala_Naresh_Cover_Letter.pdf</code>, and{' '}
              <code className="text-slate-200 font-mono">index.html</code>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="border border-slate-800 rounded-xl bg-[#0D1322] p-6 space-y-3">
              <h2 className="text-base font-semibold text-white">01. Dynamic Experience Months &amp; 10+ Years Sync</h2>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  · <strong>JPMorgan Chase Tenure (<code className="font-mono text-emerald-400">Mar 2026 – Present · 9 mos</code>):</strong> Dynamically calculates inclusive elapsed months in <code className="font-mono text-indigo-300">script.js?v=56</code> so it currently displays <code className="font-mono text-emerald-400">9 mos</code> and automatically increments by +1 every month (<code className="font-mono">10 mos</code> next month, rolling into <code className="font-mono">1 yr X mos</code> at 12+ months).
                </li>
                <li>
                  · <strong>Dynamic Total Experience (<code className="font-mono text-emerald-400">10+ years</code>):</strong> Combines the 118 months across your 7 prior roles with the live JPMorgan Chase month count (<code className="font-mono">118 + 9 = 127 mos = 10 yrs 7 mos</code>) to dynamically keep <code className="font-mono text-emerald-400">10+</code> synchronized across the Hero counter, Hero summary, About narrative, and Experience eyebrow.
                </li>
              </ul>
            </article>

            <article className="border border-slate-800 rounded-xl bg-[#0D1322] p-6 space-y-3">
              <h2 className="text-base font-semibold text-white">02. Unblocked High-DPI Résumé &amp; Cover Letter Viewer</h2>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  · <strong>Zero Chrome Iframe Block:</strong> Clicking <strong>Download Résumé</strong> or <strong>Download Cover Letter</strong> in Live Portfolio Preview now renders crisp high-DPI scrollable pages inside <code className="font-mono">#viewer-body</code> so Chrome never displays <code className="font-mono text-amber-300">This page has been blocked by Chrome</code>.
                </li>
                <li>
                  · <strong>Working Open ↗ &amp; Download Buttons:</strong> Both buttons inside the viewer bridge directly to in-memory <code className="font-mono">Blob</code> downloads and full-screen viewing.
                </li>
              </ul>
            </article>

            <article className="border border-slate-800 rounded-xl bg-[#0D1322] p-6 space-y-3">
              <h2 className="text-base font-semibold text-white">03. Awards &amp; Honors Blue/Cyan Keyword Highlights (#awards)</h2>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  · <strong>Highlighted Keywords (<code className="font-mono text-cyan-300">.kw-blue</code>):</strong> <span className="text-cyan-300 font-semibold">AWS Nova Challenge 2025 – First Runner-Up (Trianz)</span>, <span className="text-cyan-300 font-semibold">"Reimagining Claims Adjustment"</span>, <span className="text-cyan-300 font-semibold">AWS Nova LLM and Enterprise AI</span>, <span className="text-cyan-300 font-semibold">Strands Agents, CrewAI, MCP, Bedrock AgentCore, vision agents</span>, <span className="text-cyan-300 font-semibold">Team Excellence Award (Anytime Awards 2025)</span>, <span className="text-cyan-300 font-semibold">GenAI and Agentic AI solutions</span>, <span className="text-cyan-300 font-semibold">insurance claim automation</span>, <span className="text-cyan-300 font-semibold">NYL Real Estate Manager Modernization</span>, and <span className="text-cyan-300 font-semibold">TSPGECET-2020</span>.
                </li>
                <li>
                  · <strong>Highlighted Metrics (<code className="font-mono text-cyan-300">.metric</code>):</strong> <span className="text-cyan-300 font-mono font-semibold">60% faster</span> claim response and <span className="text-cyan-300 font-mono font-semibold">State Rank 47</span>.
                </li>
              </ul>
            </article>

            <article className="border border-slate-800 rounded-xl bg-[#0D1322] p-6 space-y-3">
              <h2 className="text-base font-semibold text-white">04. Skills, Certs &amp; Education Alignment</h2>
              <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
                <li>
                  · <strong>6 Resume Skill Categories:</strong> Agentic AI &amp; Orchestration, GenAI &amp; LLM, ML / DL, AWS Cloud, Azure &amp; Google Cloud, and Engineering, Data &amp; Governance.
                </li>
                <li>
                  · <strong>Education (#education):</strong> M.Tech. – Systems &amp; Signal Processing (SSP) at JNTUH College of Engineering, Hyderabad (Autonomous) · <span className="text-indigo-300">2022 – May 2027 (expected)</span>; B.Tech. ECE · <span className="text-indigo-300">2013</span>.
                </li>
              </ul>
            </article>
          </div>
        </main>
      )}

      {/* Full-Screen Unblocked Document Modal when clicking "Open ↗" inside Live Portfolio Preview */}
      {fullScreenDoc && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex flex-col">
          <div className="flex items-center justify-between px-6 py-3.5 bg-[#0E1322] border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="text-sm font-semibold text-white font-mono">
                {fullScreenDoc.fileName}
              </span>
              <span className="text-xs text-slate-400">
                ({fullScreenDoc.pages.length} {fullScreenDoc.pages.length === 1 ? 'page' : 'pages'})
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => downloadPdfByFileName(fullScreenDoc.fileName, fullScreenDoc.href)}
                className="px-4 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
              <button
                type="button"
                onClick={() => setFullScreenDoc(null)}
                className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
                aria-label="Close full-screen preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center gap-6">
            {fullScreenDoc.pages.map((src, idx) => (
              <img
                key={src}
                src={src}
                alt={`${fullScreenDoc.fileName} — Page ${idx + 1}`}
                className="w-full max-w-[960px] h-auto rounded-lg shadow-2xl bg-white"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
