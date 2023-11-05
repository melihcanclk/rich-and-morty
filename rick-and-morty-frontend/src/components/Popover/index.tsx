import { ReactNode, useState } from 'react';
import style from './Popover.module.scss'
import Button from '../Button';

type Props = {
    triggerText: string;
    content: ReactNode;
}

const Popover = ({
    triggerText,
    content
}: Props) => {
    const [isPopoverVisible, setPopoverVisible] = useState(false);

    const togglePopover = () => {
        setPopoverVisible(!isPopoverVisible);
    };

    return (
        <div className={style.popover}>
            <Button onClick={togglePopover}>{triggerText}</Button>
            {isPopoverVisible && <div className={style.popover_content}>
                {content}
            </div>}
        </div>
    )
}

export default Popover