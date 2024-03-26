import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
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

    const blockProps = useBlockProps.save({
        id: blockID,
    });

    // Get current date based on selected format
    const currentDate = dateI18n(dateFormat);

    return (
        <>
            <span {...blockProps} style={{
                    color: textColor,
                    fontSize: fontSize,
                    fontFamily: fontFamily,
                    letterSpacing:letterSpacing + "px",
                    textTransform:textTransform,
                    fontWeight: fontWeight,
                    lineHeight: lineHeight + "px",
                    padding: `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px`
            }}>
                {currentDate}
            </span>
        </>
    );
}

