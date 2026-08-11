export default function GlassPanel({
  children,
  variant = 'light',
  className = '',
  style = {},
  as: Tag = 'div',
  ...props
}) {
  const variants = {
    light: 'glass-panel--light',
    dark: 'glass-panel--dark',
    accent: 'glass-panel--accent',
  };

  const variantClass = variants[variant] || variants.light;

  return (
    <Tag
      className={`glass-panel ${variantClass} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Tag>
  );
}
