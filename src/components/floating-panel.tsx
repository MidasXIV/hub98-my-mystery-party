"use client";

import * as React from "react";
import { FloatingPanel } from "@ark-ui/react/floating-panel";
import { Portal } from "@ark-ui/react/portal";
import { ArrowDownLeft, Maximize2, Minus, X, GripVertical } from "lucide-react";

// Generic floating panel allowing consumers to provide a custom trigger and body (children)
// Example usage:
// <GenericFloatingPanel
//   trigger={<button className="btn">Objectives</button>}
//   title="Mission Objectives"
// >
//   <ObjectivesPanel ... />
// </GenericFloatingPanel>

export interface GenericFloatingPanelProps {
  trigger: React.ReactNode;
  title?: React.ReactNode;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  headerActions?: React.ReactNode;
  hideStageControls?: boolean;
  resizable?: boolean;
  draggable?: boolean;
  /** Provide an initial size override for the panel instead of the library default (often ~240px height). */
  initialSize?: { width?: number | string; height?: number | string };
  /** Inline style overrides applied to FloatingPanel.Content (after size). */
  contentStyle?: React.CSSProperties;
  /** Optional className override for the FloatingPanel.Body wrapper */
  bodyClassName?: string;
}

export default function GenericFloatingPanel({
  trigger,
  title = "Panel",
  children,
  onClose,
  className = "",
  headerActions,
  hideStageControls = false,
  resizable = true,
  draggable = true,
  initialSize,
  contentStyle,
  bodyClassName,
}: GenericFloatingPanelProps) {
  return (
    <FloatingPanel.Root>
      <FloatingPanel.Trigger className="focus:outline-none">
        {trigger}
      </FloatingPanel.Trigger>
      <Portal>
        <FloatingPanel.Positioner className="z-50">
          <FloatingPanel.Content
            className={`flex flex-col bg-white/80 dark:bg-black/40 border border-gray-200/60 dark:border-white/10 shadow-xl backdrop-blur-md rounded-lg data-[stage=maximized]:rounded-none w-full min-w-80 ${className}`}
            style={{
              ...(initialSize?.width !== undefined && {
                width: initialSize.width,
              }),
              ...(initialSize?.height !== undefined && {
                height: initialSize.height,
              }),
              ...contentStyle,
            }}
          >
            {draggable ? (
              <FloatingPanel.DragTrigger>
                <Header
                  title={title}
                  hideStageControls={hideStageControls}
                  headerActions={headerActions}
                  onClose={onClose}
                />
              </FloatingPanel.DragTrigger>
            ) : (
              <Header
                title={title}
                hideStageControls={hideStageControls}
                headerActions={headerActions}
                onClose={onClose}
              />
            )}
            <FloatingPanel.Body className={bodyClassName || "flex flex-col gap-4 flex-1 overflow-auto"}>
              {children}
            </FloatingPanel.Body>
            {resizable && (
              <>
                <FloatingPanel.ResizeTrigger axis="n" />
                <FloatingPanel.ResizeTrigger axis="e" />
                <FloatingPanel.ResizeTrigger axis="w" />
                <FloatingPanel.ResizeTrigger axis="s" />
                <FloatingPanel.ResizeTrigger axis="ne" />
                <FloatingPanel.ResizeTrigger axis="se" />
                <FloatingPanel.ResizeTrigger axis="sw" />
                <FloatingPanel.ResizeTrigger axis="nw" />
              </>
            )}
          </FloatingPanel.Content>
        </FloatingPanel.Positioner>
      </Portal>
    </FloatingPanel.Root>
  );
}

interface HeaderProps {
  title: React.ReactNode;
  hideStageControls: boolean;
  headerActions?: React.ReactNode;
  onClose?: () => void;
}

function Header({ title, hideStageControls, headerActions, onClose }: HeaderProps) {
  return (
    <FloatingPanel.Header className="text-sm py-2 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center select-none rounded-t-lg">
      <div className="flex items-center gap-2 min-w-0">
        <GripVertical className="w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
        <FloatingPanel.Title className="font-medium text-gray-900 dark:text-gray-100 truncate">
          {title}
        </FloatingPanel.Title>
      </div>
      <FloatingPanel.Control className="flex items-center gap-1 ml-2">
        {headerActions}
        {!hideStageControls && (
          <>
            <FloatingPanel.StageTrigger
              stage="minimized"
              aria-label="Minimize panel"
              className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Minus className="w-3 h-3" />
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger
              stage="maximized"
              aria-label="Maximize panel"
              className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
            </FloatingPanel.StageTrigger>
            <FloatingPanel.StageTrigger
              stage="default"
              aria-label="Restore panel"
              className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <ArrowDownLeft className="w-3 h-3" />
            </FloatingPanel.StageTrigger>
          </>
        )}
        <FloatingPanel.CloseTrigger
          aria-label="Close panel"
          className="w-6 h-6 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
          onClick={onClose}
        >
          <X className="w-3 h-3" />
        </FloatingPanel.CloseTrigger>
      </FloatingPanel.Control>
    </FloatingPanel.Header>
  );
}
