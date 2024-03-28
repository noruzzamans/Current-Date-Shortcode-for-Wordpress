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


import { TAG, FONT_FAMILYS } from "./constants/constants";
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
        desktop_padding,
        tab_padding,
        mobile_padding,
        activeDevice
    } = attributes;

    const blockProps = useBlockProps();
    const [paddingLink, setPaddingLink] = useState(true);
    const [previousPadding, setPreviousPadding] = useState(desktop_padding);

    /** Function to update all padding values */
    const updateAllPadding = (value, device) => {
        switch(device) {
            case 'desktop':
                setAttributes({
                    desktop_padding: {
                        top: value,
                        right: value,
                        bottom: value,
                        left: value
                    }
                });
                break;
            case 'tab':
                setAttributes({
                    tab_padding: {
                        top: value,
                        right: value,
                        bottom: value,
                        left: value
                    }
                });
                break;
            case 'mobile':
                setAttributes({
                    mobile_padding: {
                        top: value,
                        right: value,
                        bottom: value,
                        left: value
                    }
                });
                break;
            default:
                break;
        }
    };
    
    
    /** Function to handle input change */
    const handlePaddingInputChange = (e, direction) => {
        const value = e.target.value;
        switch(activeDevice) {
            case 'desktop':
                setAttributes({ desktop_padding: { ...desktop_padding, [direction]: value } });
                break;
            case 'tab':
                setAttributes({ tab_padding: { ...tab_padding, [direction]: value } });
                break;
            case 'mobile':
                setAttributes({ mobile_padding: { ...mobile_padding, [direction]: value } });
                break;
            default:
                break;
        }
        /** Update all padding values if paddingLink is true */
        if (paddingLink) {
            updateAllPadding(value, activeDevice);
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
        setPreviousPadding(desktop_padding);
    }, [desktop_padding]); 

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


    /** Function to handle device click */
    const handleDeviceClick = (device) => {
        setAttributes({ activeDevice: device });
    };

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
                        <div className="cdsfw_label_container">
                            <p className="cdsfw_label_text">Padding</p>
                            <div className="cdfw_responsive_devices">
                                <button className={`cdfw_desktop_device ${activeDevice === 'desktop' ? 'active' : ''}`} onClick={() => handleDeviceClick('desktop')}>
                                    <svg width="8" height="7" viewBox="0 0 8 7"><path d="M7.33333 0H0.666667C0.298611 0 0 0.293945 0 0.65625V5.03125C0 5.39355 0.298611 5.6875 0.666667 5.6875H3.33333L3.11111 6.34375H2.11111C1.92639 6.34375 1.77778 6.49004 1.77778 6.67188C1.77778 6.85371 1.92639 7 2.11111 7H5.88889C6.07361 7 6.22222 6.85371 6.22222 6.67188C6.22222 6.49004 6.07361 6.34375 5.88889 6.34375H4.88889L4.66667 5.6875H7.33333C7.70139 5.6875 8 5.39355 8 5.03125V0.65625C8 0.293945 7.70139 0 7.33333 0ZM7.11111 4.8125H0.888889V0.875H7.11111V4.8125Z"></path></svg>
                                </button>
                                <button className={`cdfw_tab_device ${activeDevice === 'tab' ? 'active' : ''}`} onClick={() => handleDeviceClick('tab')}>
                                    <svg width="6" height="7" viewBox="0 0 6 7"><path d="M5 0H1C0.446667 0 0 0.390833 0 0.875V6.125C0 6.60917 0.446667 7 1 7H5C5.55333 7 6 6.60917 6 6.125V0.875C6 0.390833 5.55333 0 5 0ZM3.66667 6.41667H2.33333V6.125H3.66667V6.41667ZM5.41667 5.54167H0.583333V0.875H5.41667V5.54167Z"></path></svg>
                                </button>
                                <button className={`cdfw_mobile_device ${activeDevice === 'mobile' ? 'active' : ''}`} onClick={() => handleDeviceClick('mobile')}>
                                    <svg width="4" height="7" viewBox="0 0 4 7"><path d="M3.33333 0H0.666667C0.297778 0 0 0.390833 0 0.875V6.125C0 6.60917 0.297778 7 0.666667 7H3.33333C3.70222 7 4 6.60917 4 6.125V0.875C4 0.390833 3.70222 0 3.33333 0ZM2.44444 6.41667H1.55556V6.125H2.44444V6.41667ZM3.61111 5.54167H0.388889V0.875H3.61111V5.54167Z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="cdsfw_input_container">
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Top</label>
                                <input
                                    type="number"
                                    name="top"
                                    value={activeDevice === 'desktop' ? desktop_padding.top : activeDevice === 'tab' ? tab_padding.top : mobile_padding.top}
                                    onChange={(e) => handlePaddingInputChange(e, 'top')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Right</label>
                                <input
                                    type="number"
                                    name="right"
                                    value={activeDevice === 'desktop' ? desktop_padding.right : activeDevice === 'tab' ? tab_padding.right : mobile_padding.right}
                                    onChange={(e) => handlePaddingInputChange(e, 'right')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Bottom</label>
                                <input
                                    type="number"
                                    name="bottom"
                                    value={activeDevice === 'desktop' ? desktop_padding.bottom : activeDevice === 'tab' ? tab_padding.bottom : mobile_padding.bottom}
                                    onChange={(e) => handlePaddingInputChange(e, 'bottom')}
                                />
                            </div>
                            <div className="cdsfw_input_wrapper">
                                <label className="cdsfw_spacing_input_label">Left</label>
                                <input
                                    type="number"
                                    name="left"
                                    value={activeDevice === 'desktop' ? desktop_padding.left : activeDevice === 'tab' ? tab_padding.left : mobile_padding.left}
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
                <span  style={{
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: fontSize,
                    letterSpacing: letterSpacing + "px",
                    textTransform: textTransform,
                    fontWeight: fontWeight,
                    lineHeight: lineHeight + "px",
                    padding: `${activeDevice === 'desktop' ? desktop_padding.top : activeDevice === 'tab' ? tab_padding.top : mobile_padding.top}px 
                            ${activeDevice === 'desktop' ? desktop_padding.right : activeDevice === 'tab' ? tab_padding.right : mobile_padding.right}px 
                            ${activeDevice === 'desktop' ? desktop_padding.bottom : activeDevice === 'tab' ? tab_padding.bottom : mobile_padding.bottom}px 
                            ${activeDevice === 'desktop' ? desktop_padding.left : activeDevice === 'tab' ? tab_padding.left : mobile_padding.left}px`
                }}>
                    {currentDate}
                </span>
            </div>
        </>
    );
}