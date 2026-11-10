import {
    Accessibility,
    ChartNoAxesCombined,
    CodeXml,
    CreditCard,
    Database,
    FlaskConical,
    KeyRound,
    Layers,
    Network,
    NotebookPen,
    PenTool,
    Rocket,
    Sparkles,
} from 'lucide-react'
import {
    AdobeSVG,
    AngularSVG,
    AppsScriptSVG,
    AzureSVG,
    BootstrapSVG,
    FigmaSVG,
    FramerMotionSVG,
    GcpSVG,
    GitlabSVG,
    HubspotSVG,
    JavascriptSVG,
    KubernetesSVG,
    MaterialSVG,
    NetlifySVG,
    ReactSVG,
    SketchSVG,
    SlackSVG,
    StorybookSVG,
    StyledComponentsSVG,
    TailwindAltSVG,
    TypescriptSVG,
    ViteSVG,
} from '../assets/logos/svgs'
import customerIo from '../assets/logos/customerIo.png'
import elasticsearch from '../assets/logos/svgs/elasticsearch.svg'
import googleMaps from '../assets/logos/svgs/google-maps.svg'
import github from '../assets/logos/svgs/github.svg'
import shadcn from '../assets/logos/svgs/shadcn.svg'

const logos = {
    Elasticsearch: elasticsearch,
    'Google Maps APIs': googleMaps,
    'Adobe XD': AdobeSVG,
    'Agentic models': Sparkles,
    'Asynchronous messaging': Network,
    'Full-stack tech lead': CodeXml,
    'UX + UI design': PenTool,
    'UX + UI design lead': PenTool,
    'Accessibility design': Accessibility,
    'Data normalization and sync': Database,
    'Frontend architecture and migrations': Layers,
    'Frontend development': CodeXml,
    'Frontend lead': CodeXml,
    'Post-launch support': Rocket,
    'Marketing automation and A/B testing': FlaskConical,
    'MVP definition': NotebookPen,
    'Onboarding and campaign messaging': ChartNoAxesCombined,
    'Internal tooling': CodeXml,
    'User research and A/B testing': FlaskConical,
    Angular: AngularSVG,
    'Google Apps Script': AppsScriptSVG,
    Azure: AzureSVG,
    Bootstrap: BootstrapSVG,
    'Customer.io': customerIo,
    Figma: FigmaSVG,
    'Framer Motion': FramerMotionSVG,
    'Google Cloud': GcpSVG,
    GitHub: github,
    GitLab: GitlabSVG,
    HubSpot: HubspotSVG,
    JavaScript: JavascriptSVG,
    Kubernetes: KubernetesSVG,
    'Material Design': MaterialSVG,
    Netlify: NetlifySVG,
    OAuth: KeyRound,
    React: ReactSVG,
    'REST APIs': CodeXml,
    'shadcn/ui': shadcn,
    Sketch: SketchSVG,
    Slack: SlackSVG,
    Storybook: StorybookSVG,
    Stripe: CreditCard,
    'styled-components': StyledComponentsSVG,
    'Tailwind CSS': TailwindAltSVG,
    TypeScript: TypescriptSVG,
    Vite: ViteSVG,
}

const projectTechnologies: Partial<Record<string, (keyof typeof logos)[]>> = {
    'adp-thrive': ['React', 'Vite', 'Stripe', 'OAuth', 'REST APIs'],
    'capcenter-lca': ['Figma', 'React', 'Bootstrap', 'TypeScript', 'Azure'],
    'fringe-discovery': [
        'React',
        'Vite',
        'Framer Motion',
        'TypeScript',
        'styled-components',
        'Tailwind CSS',
        'Storybook',
        'GitHub',
        'Netlify',
        'Figma',
    ],
    'mortgage-application': [
        'React',
        'Bootstrap',
        'TypeScript',
        'Storybook',
        'Azure',
        'Kubernetes',
        'Figma',
        'Sketch',
    ],
    'nba-top-shot': ['Customer.io', 'HubSpot', 'Google Apps Script', 'Slack'],
    'real-estate-property-search': [
        'Elasticsearch',
        'Google Maps APIs',
        'Figma',
        'React',
        'Bootstrap',
        'TypeScript',
        'Storybook',
        'Azure',
        'Kubernetes',
    ],
    'san-joaquin-matching-engine': [
        'Adobe XD',
        'Angular',
        'Material Design',
        'JavaScript',
        'TypeScript',
        'Google Cloud',
        'GitLab',
    ],
}

const projectContributions: Partial<Record<string, (keyof typeof logos)[]>> = {
    'creative-studio': [
        'UX + UI design',
        'Full-stack tech lead',
        'Agentic models',
        'Asynchronous messaging',
    ],
    'adp-thrive': [
        'MVP definition',
        'UX + UI design lead',
        'Frontend lead',
        'Post-launch support',
    ],
    'capcenter-lca': [
        'UX + UI design lead',
        'Frontend lead',
        'User research and A/B testing',
        'Post-launch support',
    ],
    'fringe-discovery': [
        'User research and A/B testing',
        'UX + UI design',
        'Frontend lead',
        'Frontend architecture and migrations',
    ],
    'mortgage-application': [
        'UX + UI design lead',
        'Frontend lead',
        'User research and A/B testing',
    ],
    'nba-top-shot': [
        'Data normalization and sync',
        'Marketing automation and A/B testing',
        'Onboarding and campaign messaging',
        'Internal tooling',
    ],
    'real-estate-property-search': [
        'UX + UI design lead',
        'Frontend lead',
        'User research and A/B testing',
    ],
    'san-joaquin-matching-engine': [
        'UX + UI design lead',
        'Accessibility design',
        'Frontend development',
    ],
}

export default function ProjectTechnologies({ slug }: { slug: string }) {
    const isCreativeStudio = slug === 'creative-studio'
    const groups: { heading: string; items: (keyof typeof logos)[] }[] = [
        { heading: 'My contribution', items: projectContributions[slug] ?? [] },
        {
            heading: isCreativeStudio ? 'Demo built with' : 'Technologies',
            items: isCreativeStudio
                ? ['React', 'TypeScript', 'shadcn/ui', 'Tailwind CSS']
                : (projectTechnologies[slug] ?? []),
        },
    ]
    const visibleGroups = groups.filter(({ items }) => items.length > 0)

    if (!visibleGroups.length) return null

    return (
        <div className="flex flex-col gap-5 border-l border-solid border-rule pl-5 compact:border-l-0 compact:pl-0">
            {visibleGroups.map(({ heading, items }) => (
                <section
                    key={heading}
                    aria-label={heading}
                >
                    <h2 className="m-0 text-sm font-normal text-muted">
                        {heading}
                    </h2>
                    <ul
                        role="list"
                        className="m-0 mt-2 flex list-none flex-col gap-x-4 gap-y-2 p-0 compact:flex-row compact:flex-wrap"
                    >
                        {items.map((name) => {
                            const Icon = logos[name]
                            return (
                                <li
                                    key={name}
                                    className="flex items-center gap-2 text-sm text-ink"
                                >
                                    {typeof Icon === 'string' ? (
                                        <img
                                            src={Icon}
                                            alt=""
                                            className="size-5 shrink-0 object-contain"
                                        />
                                    ) : (
                                        <Icon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 text-violet"
                                        />
                                    )}
                                    {name}
                                </li>
                            )
                        })}
                    </ul>
                </section>
            ))}
        </div>
    )
}
