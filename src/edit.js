import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';
import { PanelBody, SelectControl } from '@wordpress/components'; 
import './editor.scss';

export default function Edit({ attributes, setAttributes, clientId }) {
    const { blockID, dateFormat } = attributes;

    // Set blockID using clientId
    if (clientId) {
        setAttributes({
            blockID: "cdsfw-current-date-" + clientId.slice(0, 8),
        });
    }

    const blockProps = useBlockProps();

    // Get current date based on selected format
    const currentDate = dateI18n(dateFormat);

    return (
        <>
            <InspectorControls key="controls">
                <PanelBody title={__('Date Format', 'current-date')}>
                    <SelectControl
                        label={__('Select Date Format', 'current-date')}
                        value={dateFormat}
                        options={[
                            { label: __('Default', 'current-date'), value: 'jS F Y' },
                            { label: __('F j, Y', 'current-date'), value: 'F j, Y' },
                            { label: __('l, F jS, Y', 'current-date'), value: 'l, F jS, Y' },
                            { label: __('D, M j, Y', 'current-date'), value: 'D, M j, Y' },
                            { label: __('j F Y', 'current-date'), value: 'j F Y' },
                            { label: __('M j, Y', 'current-date'), value: 'M j, Y' },
                            { label: __('j M Y', 'current-date'), value: 'j M Y' },
                            { label: __('Y-M-d', 'current-date'), value: 'Y-M-d' },
                            { label: __('d F Y', 'current-date'), value: 'd F Y' },
                            { label: __('M j', 'current-date'), value: 'M j' },
                            { label: __('F jS', 'current-date'), value: 'F jS' },
                            { label: __('jS M Y', 'current-date'), value: 'jS M Y' },
                            { label: __('l, M jS, Y', 'current-date'), value: 'l, M jS, Y' },
                            { label: __('D, j M Y', 'current-date'), value: 'D, j M Y' },
                            { label: __('l, j F Y', 'current-date'), value: 'l, j F Y' },
                            { label: __('D, M j Y', 'current-date'), value: 'D, M j Y' },
                            { label: __('d/m/Y', 'current-date'), value: 'd/m/Y' },
                            { label: __('j.n.Y', 'current-date'), value: 'j.n.Y' },
                            { label: __('Y.m.d', 'current-date'), value: 'Y.m.d' },
                            { label: __('d-m-Y', 'current-date'), value: 'd-m-Y' },
                            { label: __('Y-m-d', 'current-date'), value: 'Y-m-d' },
                            { label: __('Y/m/d', 'current-date'), value: 'Y/m/d' },
                            { label: __('m/d/Y', 'current-date'), value: 'm/d/Y' }
                        ]}
                        onChange={(value) => setAttributes({ dateFormat: value })}
                    />
                </PanelBody>
            </InspectorControls>
            <div {...blockProps} id={blockID}>
                <span>{currentDate}</span>
            </div>
        </>
    );
}



