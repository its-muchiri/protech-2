export default function SectionBG({
  image,
  overlay = 'dark',
  children,
  style,
  className,
  contentStyle,
  as: Tag = 'section',
  ...rest
}) {
  return (
    <Tag className={className ? `section-bg ${className}` : 'section-bg'} style={style} {...rest}>
      {image && (
        <>
          <img className="section-bg-img" src={image} alt="" aria-hidden="true" loading="lazy" />
          <div className={`section-bg-overlay section-bg-overlay--${overlay}`} />
        </>
      )}
      <div className="section-bg-content" style={contentStyle}>
        {children}
      </div>
    </Tag>
  );
}
