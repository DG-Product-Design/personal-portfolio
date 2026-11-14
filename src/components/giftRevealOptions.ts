export type GiftRevealVariant = 'seam' | 'corners' | 'cascade'

export const giftRevealOptions: Array<{
    id: GiftRevealVariant
    label: string
    description: string
}> = [
    {
        id: 'seam',
        label: 'Hand-torn pieces',
        description: 'Broad interlocking pieces with irregular curved tears.',
    },
    {
        id: 'corners',
        label: 'Staggered tears',
        description: 'Three uneven rows with offset seams and varied pieces.',
    },
    {
        id: 'cascade',
        label: 'Fine fragments',
        description: 'Smaller pieces with a finer, more frequent torn edge.',
    },
]
