import { useState, useEffect } from "@wordpress/element";
import { __ } from '@wordpress/i18n';
import { dateI18n } from '@wordpress/date';
import { 
    useBlockProps,
    InspectorControls,
    PanelColorSettings
} from '@wordpress/block-editor';
import { 
    PanelBody,
    SelectControl,
	RangeControl
} from '@wordpress/components';


import { FONT_FAMILYS } from "./constants/constants";
import './editor.scss';
 
export default function Edit({ attributes, setAttributes }) {
    const { 
        blockID,
        dateFormat,
        textColor,
        fontSize,
        letterSpacing,
        textTransform,
        fontFamily,
        fontWeight,
        lineHeight,
        padding
    } = attributes;

    const blockProps = useBlockProps();
    const [paddingLink, setPaddingLink] = useState(true);
    const [previousPadding, setPreviousPadding] = useState(padding);

    /** Function to update all padding values */
    const updateAllPadding = (value) => {
        setAttributes({
            padding: {
                top: value,
                right: value,
                bottom: value,
                left: value
            }
        });
    };
    
    /** Function to handle input change */
    const handlePaddingInputChange = (e, direction) => {
        const value = e.target.value;
        setAttributes({ padding: { ...padding, [direction]: value } });
        /** Update all padding values if paddingLink is true */
        if (paddingLink) {
            updateAllPadding(value);
        }
    };
    
    /** Function to handle paddingLink toggle */
    const handlePaddingLinkToggle = () => {
        if (!paddingLink) {
            /** If paddingLink is being turned off, restore previous padding values */
            setAttributes({ padding: previousPadding });
        }
        setPaddingLink(!paddingLink);
    };
    
    /** Update previousPadding state when padding changes */
    useEffect(() => {
        setPreviousPadding(padding);
    }, [padding]); 

    /* set default values for the style attributes */
    useEffect(() => {
        if (fontFamily) {
            const fontUrl = `https://fonts.googleapis.com/css?family=${fontFamily.replace(' ', '+')}`;
            const linkElement = document.createElement('link');
            linkElement.rel = 'stylesheet';
            linkElement.href = fontUrl;
            document.head.appendChild(linkElement);
        }
    }, [fontFamily]);
    
    /** Get current date based on selected format */
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

                <PanelBody
					title={__("Typography", "current-date")}
                    initialOpen={false}
				>
                    <PanelColorSettings
                        title={__('Color', 'current-date')}
                        enableAlpha={true}
                        className = 'Panel_Color_Settings'
                        colorSettings={[
                            {
                                label: __('Text Color', 'current-date'),
                                value: textColor,
                                onChange: (value) => setAttributes({ textColor: value }),
                            },
                        ]}
                        colors={[
                            { name: 'White', color: '#ffffff' },
                            { name: 'Red', color: '#ff0000' },
                            { name: 'Green', color: '#00ff00' },
                            { name: 'Blue', color: '#0000ff' },
                            { name: 'Yellow', color: '#ffff00' },
                            { name: 'Black', color: '#000000' },
                        ]}
                    />
					<RangeControl
						label={__("Font Size", "current-date")}
						value={fontSize}
						onChange={(fontSize) => setAttributes({ fontSize })}
						min={1}
						max={200}
					/>

                    <SelectControl
                        label={__("Font Family", "current-date")}
                        options={FONT_FAMILYS}
                        value={fontFamily}
                        onChange={(value) => setAttributes({ fontFamily: value })}
                    />

                    <SelectControl
                        label={__("Text Transform", "current-date")}
                        options={[
                            {label: __("None", "current-date"), value: "none",},
                            {label: __("Uppercase", "current-date"),value: "uppercase",},
                            {label: __("Lowercase", "current-date"),value: "lowercase",},
                            {label: __("Capitalize", "current-date"), value: "capitalize",}
                        ]}
                        value={textTransform}
                        onChange={(textTransform) => setAttributes({ textTransform })}
                    />

                    <SelectControl
                        label={__("Font Weight", "ultimate-blocks")}
                        options={[
                            { label: __("Normal", "ultimate-blocks"), value: "normal" },
                            { label: __("Bold", "ultimate-blocks"), value: "bold" },
                            { label: "100", value: "100" },
                            { label: "200", value: "200" },
                            { label: "300", value: "300" },
                            { label: "400", value: "400" },
                            { label: "500", value: "500" },
                            { label: "600", value: "600" },
                            { label: "700", value: "700" },
                            { label: "800", value: "800" },
                            { label: "900", value: "900" },
                        ]}
                        value={fontWeight}
                        onChange={(fontWeight) => setAttributes({ fontWeight })}
                    />

					<RangeControl
						label={__("Letter Spacing", "current-date")}
						value={letterSpacing}
						onChange={(letterSpacing) => setAttributes({ letterSpacing })}
						min={-2}
						max={10}
					/>
					<RangeControl
						label={__("Line Height", "current-date")}
						value={lineHeight}
						onChange={(lineHeight) => setAttributes({ lineHeight })}
						min={10}
						max={120}
					/>
				</PanelBody>

                <PanelBody title="Spacing" initialOpen={false}>
                    <div className="cdsfw_spacing_container">
                        <div className="cdsfw_input_container">
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Top</label>
                                <input
                                    type="number"
                                    name="top"
                                    value={padding.top}
                                    onChange={(e) => handlePaddingInputChange(e, 'top')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Right</label>
                                <input
                                    type="number"
                                    name="right"
                                    value={padding.right}
                                    onChange={(e) => handlePaddingInputChange(e, 'right')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Bottom</label>
                                <input
                                    type="number"
                                    name="bottom"
                                    value={padding.bottom}
                                    onChange={(e) => handlePaddingInputChange(e, 'bottom')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Left</label>
                                <input
                                    type="number"
                                    name="left"
                                    value={padding.left}
                                    onChange={(e) => handlePaddingInputChange(e, 'left')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label"></label>
                                <span
                                    className={`dashicons ${paddingLink ? 'dashicons-admin-links' : 'dashicons-editor-unlink'} ${paddingLink ? 'is-checked' : ''}`}
                                    onClick={handlePaddingLinkToggle}
                                >
                                </span>
                            </div>
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <span style={{
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    letterSpacing:letterSpacing + "px",
                    textTransform:textTransform,
                    fontWeight: fontWeight,
                    lineHeight: lineHeight + "px",
                    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
                }}>
                    {currentDate}
                </span>
            </div>
        </>
    );
}