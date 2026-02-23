/**
 * TypeScript definition adjustments for WordPress globals
 */
import React from 'react';

// We need to declare the wordpress globals to avoid TS errors
declare global {
  interface Window {
    wp: any;
  }
}

// Minimal types for props
interface BlockProps {
  attributes: {
    company: string;
    theme: string;
  };
  setAttributes: (attrs: any) => void;
}

const { InspectorControls, useBlockProps } = window.wp.blockEditor;
const { PanelBody, TextControl, SelectControl } = window.wp.components;
const { registerBlockType } = window.wp.blocks;

export const BookingBlock = () => {
  registerBlockType('mybooking/form', {
    title: 'MyBooking Form',
    icon: 'calendar-alt',
    category: 'widgets',
    attributes: {
      company: { type: 'string', default: '' },
      theme: { type: 'string', default: 'light' },
    },
    edit: ({ attributes, setAttributes }: BlockProps) => {
      const blockProps = useBlockProps();

      return (
        <div {...blockProps}>
          <InspectorControls>
            <PanelBody title="Widget Settings" initialOpen={true}>
              <TextControl
                label="Company Slug"
                value={attributes.company}
                onChange={(val: string) => setAttributes({ company: val })}
                help="Enter your company slug from the SaaS dashboard."
              />
              <SelectControl
                label="Theme"
                value={attributes.theme}
                options={[
                  { label: 'Light', value: 'light' },
                  { label: 'Dark', value: 'dark' },
                ]}
                onChange={(val: string) => setAttributes({ theme: val })}
              />
            </PanelBody>
          </InspectorControls>

          <div style={{ 
            padding: '20px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: attributes.theme === 'dark' ? '#333' : '#fff',
            color: attributes.theme === 'dark' ? '#fff' : '#000'
          }}>
            <h3 style={{ margin: 0 }}>📅 Appointment Booking Form</h3>
            <p>
              <strong>Company:</strong> {attributes.company || '(Please enter a slug)'}
            </p>
            <p>
              <strong>Theme:</strong> {attributes.theme}
            </p>
            <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
              (Widget will be rendered here on the frontend)
            </div>
          </div>
        </div>
      );
    },
    save: () => {
      // Return null for dynamic blocks (rendering happens in PHP via render_callback)
      // This ensures the block is rendered using the same logic as the shortcode [mybooking-form]
      return null;
    },
  });
};
