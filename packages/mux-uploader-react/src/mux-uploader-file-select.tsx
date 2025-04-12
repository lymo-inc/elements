import React, { useCallback } from 'react';
import '@mux/mux-uploader';
import type { MuxUploaderFileSelectElement } from '@mux/mux-uploader';
import { toNativeProps } from './common/utils';
import { useRef } from 'react';
import { useCombinedRefs } from './useCombinedRefs';

export type MuxUploaderFileSelectRefAttributes = MuxUploaderFileSelectElement;

export type MuxUploaderFileSelectProps = {
  muxUploader?: string;
  children?: React.ReactNode;
  onFileSelect?: (filename: string) => void;
} & Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>, 'ref'>;

const MuxUploaderFileSelectInternal = React.forwardRef<MuxUploaderFileSelectRefAttributes, MuxUploaderFileSelectProps>(
  ({ children, onFileSelect, ...props }, ref) => {
    const handleFileSelect = useCallback(
      (event: Event) => {
        const target = event.target as MuxUploaderFileSelectElement;
        const files = target.files;

        if (files && files.length > 0) {
          const file = files[0];
          onFileSelect?.(file.name);
        }
      },
      [onFileSelect]
    );

    return React.createElement(
      'mux-uploader-file-select',
      {
        ...toNativeProps({ ...props, ref }),
        onChange: handleFileSelect,
      },
      children
    );
  }
);

const MuxUploaderFileSelect = React.forwardRef<MuxUploaderFileSelectRefAttributes, MuxUploaderFileSelectProps>(
  (props, ref) => {
    const innerUploaderFileSelectRef = useRef<MuxUploaderFileSelectElement>(null);
    const uploaderFileSelectRef = useCombinedRefs(innerUploaderFileSelectRef, ref);

    return (
      <MuxUploaderFileSelectInternal ref={uploaderFileSelectRef as typeof innerUploaderFileSelectRef} {...props} />
    );
  }
);

export default MuxUploaderFileSelect;
