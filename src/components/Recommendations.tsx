import jonathon from '../assets/img/recs/jonathon-alder.jpg'
import aaron from '../assets/img/recs/aaron-boyarsky.jpg'
import jeff from '../assets/img/recs/jeff-tyrrill.jpg'
import david from '../assets/img/recs/david-list.jpg'

const recommendations = [
    {
        name: 'Jonathon',
        photo: jonathon,
        title: 'Full-Stack Software Engineer',
        relationship: 'Former Fringe teammate',
        quote: 'During our time together at Fringe, David was regarded as the person to go to when any custom design or interaction was to be implemented. With his keen eye for design, he was also an extremely valuable voice to have at the table during feature proposals and prototyping, offering a unique perspective of engineering feasibility coupled with UX best practices.',
    },
    {
        name: 'Aaron',
        photo: aaron,
        title: 'Software Engineer / Artist',
        relationship: 'Former direct manager',
        quote: "He's built many reusable React components that mirror our design system, enabling other team members to easily build features that align with it. He's built the storybook stories to match, and led other team members in creating stories of their own. Often he goes above and beyond, ensuring the features he builds are responsive and accessible.",
    },
    {
        name: 'Jeff',
        photo: jeff,
        title: 'Front-End Focused Full Stack Software Developer',
        relationship: 'Former Clarvos teammate',
        quote: 'It was a pleasure working with David at Clarvos. David went above and beyond to improve the user experience throughout the product, with a strong focus on usability details as well as the software architecture underlying it.',
    },
    {
        name: 'David',
        photo: david,
        title: 'Staff Backend Engineer',
        relationship: 'Senior engineering colleague at Clarvos',
        quote: 'He combines great technical skill, a positive attitude, a collaborative mindset, and a very strong work ethic. In fact, he was always far enough ahead of the backend development that it made sense to pull him into some of the backend work, a challenge he was eager to accept.',
    },
]

export default function Recommendations({ className }: { className?: string }) {
    return (
        <section
            aria-labelledby="recommendations"
            className={className}
        >
            <h2
                id="recommendations"
                className="m-0 text-section-title leading-tight tracking-tight"
            >
                Recommendations
            </h2>
            <div className="mt-5 grid gap-x-7 gap-y-6 md:grid-cols-3">
                {recommendations.map(
                    ({ name, photo, title, relationship, quote }, index) => {
                        const attribution = [title, relationship]
                            .filter(Boolean)
                            .join(' · ')
                        return (
                            <figure
                                key={name}
                                className={`m-0 border-t border-solid pt-5 ${index === 0 ? 'border-violet md:col-span-full' : 'border-rule'}`}
                            >
                                <blockquote className="m-0">
                                    <p
                                        className={`m-0 ${index === 0 ? 'max-w-prose text-case-lede leading-snug text-ink' : 'leading-snug text-muted'}`}
                                    >
                                        {quote}
                                    </p>
                                </blockquote>
                                <figcaption className="mt-8 flex items-center gap-3">
                                    <img
                                        src={photo}
                                        alt=""
                                        width={40}
                                        height={40}
                                        loading="lazy"
                                        className="size-10 shrink-0 rounded-full object-cover"
                                    />
                                    <div>
                                        <strong className="block">
                                            {name}
                                        </strong>
                                        {attribution && (
                                            <span className="text-sm text-muted">
                                                {attribution}
                                            </span>
                                        )}
                                    </div>
                                </figcaption>
                            </figure>
                        )
                    }
                )}
            </div>
        </section>
    )
}
