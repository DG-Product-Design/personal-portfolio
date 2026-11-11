import jonathon from '../assets/img/recs/jonathon.jpg'
import aaron from '../assets/img/recs/aaron.jpg'
import jeff from '../assets/img/recs/jeff.jpg'
import sk from '../assets/img/recs/sk.jpg'

const recommendations = [
    {
        name: 'Jonathon',
        photo: jonathon,
        title: 'Full-Stack Software Engineer',
        relationship: 'Former Fringe teammate',
        quote: '"During our time together at Fringe, David was regarded as the person to go to when any custom design or interaction was to be implemented. With his keen eye for design, he was also an extremely valuable voice to have at the table during feature proposals and prototyping, offering a unique perspective of engineering feasibility coupled with UX best practices."',
    },
    {
        name: 'SK',
        photo: sk,
        title: 'Senior Product Design & Product Management',
        relationship: 'Former Fringe teammate',
        quote: '"David shined working at a fast-paced, early-stage start-up where roles were blurred and deep creativity and understanding of strategy were paramount. He made my job easier daily, helping to bring, what sometimes could be very basic designs, into beautiful, relational, and easy-to-use features. I always enjoyed design review with David, debating user experience decisions, overall aesthetic, and usability."',
    },
    {
        name: 'Jeff',
        photo: jeff,
        title: 'Front-End Focused Full Stack Software Developer',
        relationship: 'Former Clarvos teammate',
        quote: '"It was a pleasure working with David at Clarvos. David went above and beyond to improve the user experience throughout the product, with a strong focus on usability details as well as the software architecture underlying it."',
    },
    {
        name: 'Aaron',
        photo: aaron,
        title: 'Software Engineer / Artist',
        relationship: 'Former direct manager',
        quote: '"His background in design is a huge asset. He has an eye for details that ensure what he builds comes out looking great. He’s proactive about working with our design team when there are questions about the design or he has refinements to suggest. He comes with proposals and solutions to solve problems other people haven’t yet encountered or anticipated, but also with an open mind as to what direction the team wants to go."',
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
