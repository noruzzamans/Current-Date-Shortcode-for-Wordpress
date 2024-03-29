import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
    const { 
        blockID,
        dateFormat,
        display,
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
    } = attributes;


    const blockProps = useBlockProps.save({
        id: blockID,
    });

    /** Get current date based on selected format */
    const currentDate = dateI18n(dateFormat);

    // Default padding for desktop (using desktop_padding)
    const padding = `${desktop_padding.top}px ${desktop_padding.right}px ${desktop_padding.bottom}px ${desktop_padding.left}px`;

    return (
        <>

            {/* Media queries for responsive padding */}
            <style>
                {`
                    @media only screen and (max-width: 1024px) {
                        .cdsfw_responsive {
                            padding: ${tab_padding.top}px ${tab_padding.right}px ${tab_padding.bottom}px ${tab_padding.left}px !important;
                        }
                    }

                    @media only screen and (max-width: 767px) {
                        .cdsfw_responsive {
                            padding: ${mobile_padding.top}px ${mobile_padding.right}px ${mobile_padding.bottom}px ${mobile_padding.left}px !important;
                        }
                    }
                `}
            </style>
            <span {...blockProps} className="cdsfw_responsive" style={{
                    display: display,
                    color: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    letterSpacing: letterSpacing + "px",
                    textTransform: textTransform,
                    fontWeight: fontWeight,
                    lineHeight: lineHeight + "px",
                    padding,
            }}>
                {currentDate}
            </span>
        </>
    );
}
