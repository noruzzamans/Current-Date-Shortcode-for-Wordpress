import { useBlockProps } from '@wordpress/block-editor';
import { dateI18n } from '@wordpress/date';

export default function save({ attributes }) {
    const { blockID, dateFormat } = attributes;

    const blockProps = useBlockProps.save({
        id: blockID,
    });

    // Get current date based on selected format
    const currentDate = dateI18n(dateFormat);

    return (
        <>
            <div {...blockProps}>
                <span>{currentDate}</span>
            </div>
        </>
    );
}
