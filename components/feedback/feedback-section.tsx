interface FeedbackSectinProps { 
    title: string
    icon: string
    items: string[]
    type: 'positive' | 'negative' | 'neutral'

}

export function FeedbackSection({title, icon, items, type}: FeedbackSectinProps) { 
    const borderColor = type === 'positive' ? 'border-l-green-500' : type === 'negative' ? 'border-l-red-500' : 'border-l-blue-500'
    const iconColor = type === 'positive' ? 'text-green-500' : type === 'negative' ? 'text-red-500' : 'text-blue-500'

    return (
        <div>
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <span className={iconColor}>{icon}</span>
        {title}
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`p-4 bg-secondary/50 rounded-lg border-l-4 ${borderColor}`}
          >
            <p className="text-sm leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </div>
    )

}