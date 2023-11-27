const texts = {
    name: 'Eduardo Aboga Jr',
    role: 'Front-end Developer',
    info: {
        address: {
            name: 'Pasig City, Philippines',
            icon: 'fa-solid fa-location-dot'
        },
        phone: {
            name: '(+63) 916 412-4024',
            icon: 'fa-solid fa-phone'
        },
        email: {
            name: 'edabogajr@gmail.com',
            icon: 'fa-solid fa-at',
            link: 'mailto:edabogajr@gmail.com'
        },
        portfolio: {
            name: 'edxen.github.io/portfolio : Portfolio',
            icon: 'fa-solid fa-briefcase',
            link: 'https://edxen.github.io/portfolio'
        },
        github: {
            name: 'github.com/edxen : Github',
            icon: 'fa-brands fa-github',
            link: 'https://github.com/edxen'

        },
    },
    summary: {
        title: 'Career Summary',
        list: [
            "Solution driven professional with over 4 years of experience in building responsive and cross-browser compatible captive portal for major hospitality chains and independent brands.",
            "An analytical problem solver skilled at adapting to new information. With strong foundation in customer service, the importance of a job well done is well understood. "
        ]
    },
    skills: {
        web: {
            title: 'Web Development',
            list: [
                'HTML5',
                'CSS3',
                'Flexbox',
                'Bootstrap (3.2 / 5.x)',
                'TailwindCSS',
                'Javascript',
                'jQuery',
                'ReactJS',
                'Handlebars'
            ],
        },
        version_control: {
            title: 'Version Control',
            list: [
                'Git',
                'Sourcetree'
            ]
        },
        project_management: {
            title: 'Project Management',
            list: [
                'Pivotal Tracker'
            ]
        },
        also_experienced: {
            title: 'Also Experienced with',
            list: [
                'Adobe Photoshop',
                'C++',
                'MySQL',
                'Visual Basic / .NET',
                'Shell Script',
                'jq',
                'Google Workspace / Office Suites'
            ]
        }
    },
    courses: {
        title: 'Courses',
        what: 'Programming NCIV',
        where: 'College of Arts & Sciences of Asia & the Pacific',
        when: 'Jun - Nov 2012'
    },
    experience: {
        title: 'Professional Experience',
        org: {
            intertouch: {
                who: 'Intertouch Business Solutions Inc.',
                where: 'BGC, Taguig City',
                roles: [
                    {
                        title: 'Senior Web Design and Development Associate',
                        duration: 'Oct 2019 to January 2023',
                        list: [
                            'Transforms web design mockups into functional API integrated web site to serve as captive portal over Cloud using HTML, CSS, Bootstrap, Flexbox, Javascript, jQuery and Handlebars',
                            'Ensure responsive design and functionality are cross-browser compatible with web and mobile devices',
                            'Responsible for maintaining, adding and modifying existing sites based on client requirements',
                            'Maintains content translation management for 14 languages with JSON and jq',
                            'Actively leads improvement with release cycle to improve efficiency in addressing both short and long term deliverable in a timely sense'
                        ]
                    },
                    {
                        title: 'Web Design Associate',
                        duration: 'Apr 2018 to Oct 2019',
                        list: [
                            'Transformed web design mockups into functional web site that serves as captive portal with only modifying CSS in a default site template',
                            'Maintained content translation management for 13 languages under Django',
                            'Introduced script injection using Javascript to allow more customized and flexible site designs'
                        ]
                    },
                    {
                        title: 'Technical Support Representative',
                        duration: 'Dec 2015 to Apr 2018',
                        list: [
                            'Took inbound calls and answer emails to assist users in getting connected to site network',
                            'Wrote myriad of javascript bookmarklets turning data collection and URL access into a one click process',
                            'Ad Hoc as Programmer for Training Department; Developed troubleshooting tool with automated documentation using Visual Basic .NET and MySQL'
                        ]
                    }
                ]
            },
            convergys: {
                who: 'Concentrix',
                altWho: 'Convergys Philippines',
                where: 'Shaw Blvd., Mandaluyong City',
                roles: [
                    {
                        title: 'Technical Support Professional for QuickBooks',
                        duration: 'Sep 2014 to Mar 2015',
                        list: [
                            'Took inbound calls to assist clients in accounting software familiarization and troubleshooting of software related/user input error'
                        ]
                    }
                ]
            },
            omniglobe: {
                who: 'Sequential Technology International',
                altWho: 'Omniglobe Intl.',
                where: 'Eastwood, Quezon City',
                roles: {
                    first: {
                        title: 'Customer Service Representative for AT&T',
                        duration: 'Dec 2012 to Nov 2013',
                        list: [
                            'Took inbound calls to assist clients in familiarizing with web site experience and account restoration'
                        ]
                    }
                }
            }
        }
    }
};

const partials = document.querySelectorAll('script[type="text/x-handlebars-partial"]');
partials.forEach((partial) => Handlebars.registerPartial(partial.id.toString().replace('-partial', ''), partial.innerHTML));
const source = document.querySelector('#main-template').innerHTML;
const destination = document.querySelector('#root');
destination.innerHTML = Handlebars.compile(source)(texts);