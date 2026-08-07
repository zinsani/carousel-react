import { css, cx } from 'styled-system/css'

export interface CardProps {
  /** 1-2 lines; clamped beyond that. */
  title: string
  /** 2-5 lines; clamped beyond that. */
  description: string
  imageSrc: string
  imageAlt?: string
  accentColor?: string
  className?: string
}

export function Card({ title, description, imageSrc, imageAlt = '', accentColor, className }: CardProps) {
  return (
    <div className={cx(cardStyle, className)} style={accentColor ? { background: accentColor } : undefined}>
      <h3 className={titleStyle}>{title}</h3>
      <p className={descriptionStyle}>{description}</p>
      <img className={imageStyle} src={imageSrc} alt={imageAlt} />
    </div>
  )
}

const cardStyle = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '320px',
  padding: '5',
  borderRadius: 'xl',
  color: 'white',
})

const titleStyle = css({
  width: '100%',
  fontSize: 'lg',
  fontWeight: 'semibold',
  lineHeight: '1.3',
  textAlign: 'center',
  lineClamp: '2',
})

const descriptionStyle = css({
  width: '100%',
  marginTop: '2',
  fontSize: 'sm',
  lineHeight: '1.5',
  textAlign: 'center',
  opacity: 0.9,
  lineClamp: '5',
  flex: '1',
})

const imageStyle = css({
  width: '96px',
  height: '96px',
  marginTop: '3',
  borderRadius: 'full',
  objectFit: 'cover',
  boxShadow: 'md',
})
