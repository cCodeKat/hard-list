import { tagColors } from '../utils/colors';

export const mapTitle = (title: string) => {
    const tagRegex = /^\[(.*?)\]/; // [tag name]
    const isFullClear = title.endsWith("(Full Clear)");
    const match = title.match(tagRegex);
    
    let titleWithoutTag = match ? title.replace(tagRegex, '').trim() : title;
    
    if (isFullClear) {
      titleWithoutTag = titleWithoutTag.replace("(Full Clear)", '').trim();
    }
  
    const tag = match ? match[1] : '';
    
    return (
        <>
            {tag && (
            <span style={{ color: tagColors[tag] || 'inherit' }}>
                {` [${tag}] `}
            </span>
            )}
            {titleWithoutTag}
            {isFullClear && (
            <span style={{ color: '#ffff00' }}>
                {` (Full Clear)`}
            </span>
            )}
        </>
    );
};