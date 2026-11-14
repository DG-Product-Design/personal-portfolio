import { ArrowRight, ExternalLink } from 'lucide-react'
import SiteNav from '../components/SiteNav'
import ImageLightbox from '../components/ImageLightbox'
import componentLibraryVariations from '../assets/img/design-systems/component-library-variations.webp'
import componentLibraryVariationsFull from '../assets/img/design-systems/full-res/component-library-variations.png'
import fringeDarkModeFull from '../assets/img/design-systems/full-res/fringe-dark-mode.png'
import fringeLightModeFull from '../assets/img/design-systems/full-res/fringe-light-mode.png'
import gridsAndGuidesFull from '../assets/img/design-systems/full-res/grids-and-guides.png'
import loanAppScreensFull from '../assets/img/design-systems/full-res/loan-app-screens.png'
import storybookButtonsFull from '../assets/img/design-systems/full-res/buttons-preview.png'
import storybookColorsContinuedFull from '../assets/img/design-systems/full-res/colors-preview-2.png'
import storybookColorsFull from '../assets/img/design-systems/full-res/colors-preview.png'
import storybookDropdownFull from '../assets/img/design-systems/full-res/dropdown-preview.png'
import storybookIconsFull from '../assets/img/design-systems/full-res/icons-preview.png'
import storybookTypographyFull from '../assets/img/design-systems/full-res/text-preview.png'
import thriveCheckoutFull from '../assets/img/design-systems/full-res/thrive-checkout.png'
import fringeDarkMode from '../assets/img/design-systems/fringe-dark-mode.webp'
import fringeLightMode from '../assets/img/design-systems/fringe-light-mode.webp'
import gridsAndGuides from '../assets/img/design-systems/grids-and-guides.webp'
import loanAppScreens from '../assets/img/design-systems/loan-app-screens.webp'
import storybookButtons from '../assets/img/design-systems/buttons-preview.webp'
import storybookColors from '../assets/img/design-systems/colors-preview.webp'
import storybookColorsContinued from '../assets/img/design-systems/colors-preview-2.webp'
import storybookDropdown from '../assets/img/design-systems/dropdown-preview.webp'
import storybookIcons from '../assets/img/design-systems/icons-preview.webp'
import storybookTypography from '../assets/img/design-systems/text-preview.webp'
import thriveCheckout from '../assets/img/case-studies/thrive-checkout.webp'

const foundations = [
    {
        term: 'Tokens:',
        definition: 'Color, typography, spacing, radii, and states.',
        description:
            'Semantic tokens separated brand choices from component behavior, making rebrands and themes easier to implement.',
    },
    {
        term: 'Components:',
        definition:
            'Buttons, inputs, dialogs, cards, tables, navigation, and complex product patterns.',
        description:
            'Composable components with documented APIs, variants, and interaction states, designed for reuse across workflows.',
    },
    {
        term: 'Accessibility:',
        definition: 'Keyboard behavior, focus states, ARIA, and contrast.',
        description:
            'Shared accessibility patterns for keyboard navigation, focus management, ARIA semantics, and contrast compliance.',
    },
    {
        term: 'Engineering ergonomics:',
        definition:
            'Clear prop APIs, composability, consistency, and maintainability.',
        description:
            'Component APIs and documentation designed to reduce one-off implementation and make adoption easier for engineers.',
    },
    {
        term: 'Documentation:',
        definition:
            'Storybook, interactive examples, configurable props, component variants, and usage guidance.',
        description:
            'Built living documentation with interactive playgrounds, implementation code, API references, and accessibility guidance to help engineers discover, understand, test, and correctly implement components.',
    },
]

const evidence = [
    {
        company: 'Fringe',
        result: '~40% faster development',
        detail: 'Shared component architecture aligned across Figma, Storybook, and production.',
        href: '/work/fringe-discovery/',
    },
    {
        company: 'Clarvos',
        result: 'Rebrand without one-off screens',
        detail: 'A scalable theming system with Storybook as living documentation. Its modularity allowed it to adapt to 2 different redesigns. On the third, well-defined tokens and components made the transition from MUI to Tailwind seamless.',
        href: '/work/creative-studio/',
    },
    {
        company: 'CapCenter',
        result: 'Patterns shared across products',
        detail: 'Reusable foundations for the loan application, home search, and internal tools.',
        href: '/work/mortgage-application/',
    },
    {
        company: 'San Joaquin County',
        result: 'Accessibility made repeatable',
        detail: 'Shared components and conventions built around Section 508 requirements.',
        href: '/work/san-joaquin-matching-engine/',
    },
]

const storybookArtifacts = [
    {
        src: storybookColors,
        fullSrc: storybookColorsFull,
        alt: 'Storybook color documentation showing CapCenter theme colors, usage guidance, and a WCAG contrast note',
        width: 1140,
        height: 957,
        title: 'Tokens and accessibility guidance',
        caption:
            'Theme colors, implementation classes, and WCAG 2.0 AA guidance documented together.',
    },
    {
        src: storybookColorsContinued,
        fullSrc: storybookColorsContinuedFull,
        alt: 'Storybook documentation showing theme color scales, system colors, gradients, and arbitrary color usage',
        width: 1140,
        height: 1508,
        title: 'Color scales and system states',
        caption:
            'Brand scales, semantic system colors, gradients, and escape hatches for exceptional cases.',
    },
    {
        src: storybookButtons,
        fullSrc: storybookButtonsFull,
        alt: 'Storybook button documentation showing a live example, source code, and configurable component properties',
        width: 1140,
        height: 1096,
        title: 'Production-ready component APIs',
        caption:
            'Live examples, implementation code, prop definitions, variants, and component states.',
    },
    {
        src: storybookDropdown,
        fullSrc: storybookDropdownFull,
        alt: 'Storybook dropdown documentation showing an open menu, source code, and configurable properties',
        width: 1140,
        height: 1082,
        title: 'Interactive component states',
        caption:
            'A working dropdown documented alongside its API, source example, and configurable behavior.',
    },
    {
        src: storybookIcons,
        fullSrc: storybookIconsFull,
        alt: 'Storybook icon documentation showing sizing, color, rotation, and code examples',
        width: 1140,
        height: 1089,
        title: 'Reusable icon behavior',
        caption:
            'Consistent sizing, color, interaction, and transformation patterns with usage examples.',
    },
    {
        src: storybookTypography,
        fullSrc: storybookTypographyFull,
        alt: 'Storybook typography documentation showing headline scales and implementation classes',
        width: 1140,
        height: 957,
        title: 'Typography scale',
        caption:
            'Reusable type tokens presented with their visual output and production class names.',
    },
]

const artifacts = [
    {
        src: componentLibraryVariations,
        fullSrc: componentLibraryVariationsFull,
        alt: 'CapCenter product screens and Figma component variants showing different visual directions built from shared components',
        width: 1920,
        height: 1320,
        title: 'Token-driven visual direction',
        caption:
            'Small token changes created distinct visual directions without rebuilding the underlying components.',
    },
    {
        src: gridsAndGuides,
        fullSrc: gridsAndGuidesFull,
        alt: 'Figma grids and guides for desktop, tablet, and mobile breakpoints',
        width: 1918,
        height: 922,
        title: 'Responsive foundations',
        caption:
            'Breakpoints and column grids gave designers and engineers the same responsive rules.',
    },
    {
        src: fringeLightMode,
        fullSrc: fringeLightModeFull,
        alt: 'Fringe marketplace rendered with the light theme',
        width: 1788,
        height: 1291,
        title: 'Fringe light theme',
        caption:
            'The marketplace structure and component behavior remain consistent while theme tokens change.',
    },
    {
        src: fringeDarkMode,
        fullSrc: fringeDarkModeFull,
        alt: 'Fringe marketplace rendered with the dark theme',
        width: 1788,
        height: 1291,
        title: 'Fringe dark theme',
        caption:
            'A production dark mode built from the same shared components and theming system.',
    },
    {
        src: loanAppScreens,
        fullSrc: loanAppScreensFull,
        alt: 'CapCenter loan application screens across desktop and mobile showing a cohesive multi-step experience',
        width: 1920,
        height: 1320,
        title: 'Cohesion across a complex journey',
        caption:
            'Shared components kept a long, multi-device loan application consistent across many screens and states.',
    },
    {
        src: thriveCheckout,
        fullSrc: thriveCheckoutFull,
        alt: 'ADP Thrive checkout for a DoorDash gift card using Fringe marketplace components',
        width: 726,
        height: 1296,
        title: 'Components across deployments',
        caption:
            'The modular checkout system carried into a partner deployment on another domain without becoming a separate one-off.',
        figureClassName: 'max-w-md',
    },
]

export default function DesignSystemsPage() {
    return (
        <div className="mx-auto max-w-310 px-page-gutter pb-16">
            <SiteNav />
            <main id="main">
                <header className="grid gap-8 pt-[clamp(3rem,8vw,7rem)] pb-[clamp(3rem,7vw,6rem)] md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] md:items-end">
                    <div>
                        <p className="m-0 text-sm font-semibold text-violet">
                            Systems that ship
                        </p>
                        <h1 className="mt-3 mb-0 text-[clamp(3.5rem,10vw,8.5rem)] leading-[.82] font-extrabold tracking-[-.08em] text-violet motion-safe:headline-shimmer">
                            Design
                            <br />
                            Systems
                        </h1>
                    </div>
                    <div className="border-t border-solid border-rule pt-5">
                        <p className="m-0 text-case-lede leading-snug">
                            I build design systems that developers actually want
                            to use. That means clear component APIs, proper
                            extensibility, predictable behavior, accessible
                            defaults, and documentation that makes the right
                            implementation easier than inventing a new one.
                        </p>
                        <p className="mt-4 mb-0 text-sm text-muted">
                            One component library I architected, built, and
                            maintained grew to 147+ documented Storybook stories
                            and achieved 92% unit-test coverage.
                        </p>
                    </div>
                </header>

                <section aria-labelledby="system-anatomy">
                    <h2
                        id="system-anatomy"
                        className="m-0 text-section-title tracking-[-.04em]"
                    >
                        What the system covers
                    </h2>
                    <dl className="mt-5 mb-0 border-t border-solid border-rule">
                        {foundations.map(
                            ({ term, definition, description }, index) => (
                                <div
                                    key={term}
                                    className="grid gap-2 border-b border-solid border-rule/70 py-4 md:grid-cols-[3rem_minmax(12rem,.65fr)_minmax(0,1.35fr)] md:gap-5"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="text-sm font-semibold text-violet"
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <dt>
                                        <span className="font-semibold">
                                            {term}
                                        </span>
                                        &nbsp;{definition}
                                    </dt>
                                    <dd className="m-0 text-muted">
                                        {description}
                                    </dd>
                                </div>
                            )
                        )}
                    </dl>
                </section>

                <section
                    aria-labelledby="storybook-artifacts"
                    className="mt-[clamp(4rem,9vw,8rem)]"
                >
                    <div className="flex flex-wrap items-end justify-between gap-8">
                        <div>
                            <p className="m-0 text-sm font-semibold text-violet">
                                CapCenter component library
                            </p>
                            <h2
                                id="storybook-artifacts"
                                className="mt-2 mb-0 text-section-title tracking-[-.04em]"
                            >
                                Inside the Storybook
                            </h2>
                        </div>
                    </div>
                    <p className="mt-4 mb-0 text-muted">
                        These documentation screens show one of three component
                        library generations I built at CapCenter. The system
                        connected design direction to reusable code, documented
                        APIs, interaction states, and accessibility guidance.
                    </p>
                    <div className="my-8 flex w-full items-center justify-between">
                        <div className="mx-auto max-w-sm rounded-lg border border-dashed border-violet bg-muted/10 p-4 text-center">
                            <a
                                className="mb-4 inline-flex items-center font-semibold text-violet"
                                href="https://github.com/DG-Product-Design/component-library"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View the component-library source
                                <ExternalLink
                                    aria-hidden="true"
                                    className="ml-2 size-4"
                                />
                                <span className="sr-only">
                                    {' '}
                                    (opens in a new tab)
                                </span>
                            </a>
                            <p className="m-0 text-xs leading-normal text-muted">
                                Representative implementation from the same
                                period; the production system evolved across
                                several generations.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 grid items-start gap-x-6 gap-y-10 md:grid-cols-2">
                        {storybookArtifacts.map(
                            ({
                                src,
                                fullSrc,
                                alt,
                                width,
                                height,
                                title,
                                caption,
                            }) => (
                                <figure
                                    key={title}
                                    className="m-0"
                                >
                                    <ImageLightbox
                                        src={src}
                                        fullSrc={fullSrc}
                                        alt={alt}
                                        width={width}
                                        height={height}
                                        title={title}
                                        loading="lazy"
                                    />
                                    <figcaption className="mt-3 border-t border-solid border-rule/70 pt-3">
                                        <strong className="block">
                                            {title}
                                        </strong>
                                        <span className="mt-1 block text-sm text-muted">
                                            {caption}
                                        </span>
                                    </figcaption>
                                </figure>
                            )
                        )}
                    </div>
                </section>

                <section
                    aria-labelledby="system-evidence"
                    className="mt-[clamp(4rem,9vw,8rem)]"
                >
                    <h2
                        id="system-evidence"
                        className="m-0 text-section-title tracking-[-.04em]"
                    >
                        Evidence in the work
                    </h2>
                    <div className="mt-5 grid border-t border-solid border-rule md:grid-cols-2">
                        {evidence.map(({ company, result, detail, href }) => (
                            <a
                                key={company}
                                href={href}
                                className="group border-b border-solid border-rule/70 py-5 no-underline md:odd:pr-8 md:even:border-l md:even:pl-8"
                            >
                                <span className="text-sm font-semibold text-violet">
                                    {company}
                                </span>
                                <strong className="mt-2 block text-xl tracking-tight group-hover:text-violet">
                                    {result}
                                </strong>
                                <span className="mt-1 block max-w-xl text-muted">
                                    {detail}
                                </span>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet">
                                    View case study
                                    <ArrowRight
                                        aria-hidden="true"
                                        className="size-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                                    />
                                </span>
                            </a>
                        ))}
                    </div>
                </section>

                <section
                    aria-labelledby="system-artifacts"
                    className="mt-[clamp(4rem,9vw,8rem)]"
                >
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <h2
                            id="system-artifacts"
                            className="m-0 text-section-title tracking-[-.04em]"
                        >
                            The system in production
                        </h2>
                        <p className="m-0 max-w-xl text-sm text-muted">
                            Shipped product surfaces show how the shared
                            foundations held up beyond the component library.
                        </p>
                    </div>
                    <div className="mt-6 grid items-start gap-x-6 gap-y-10 md:grid-cols-2">
                        {artifacts.map(
                            ({
                                src,
                                fullSrc,
                                alt,
                                width,
                                height,
                                title,
                                caption,
                                figureClassName,
                            }) => (
                                <figure
                                    key={title}
                                    className={`m-0 ${figureClassName ?? ''}`}
                                >
                                    <ImageLightbox
                                        src={src}
                                        fullSrc={fullSrc}
                                        alt={alt}
                                        width={width}
                                        height={height}
                                        title={title}
                                        loading="lazy"
                                    />
                                    <figcaption className="mt-3 border-t border-solid border-rule/70 pt-3">
                                        <strong className="block">
                                            {title}
                                        </strong>
                                        <span className="mt-1 block text-sm text-muted">
                                            {caption}
                                        </span>
                                    </figcaption>
                                </figure>
                            )
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
