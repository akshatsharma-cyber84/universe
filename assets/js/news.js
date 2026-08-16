// news.js — Demo news data for NEWSer
const NewsData = [
  {
    id: 'n1', category: 'AI', headline: 'OpenAI Releases GPT-5 with Reasoning Capabilities',
    summary: 'OpenAI has unveiled GPT-5, its most advanced language model to date, featuring enhanced reasoning, multimodal understanding, and improved factual accuracy. The model shows significant improvements in complex problem-solving tasks.',
    whatHappened: 'OpenAI announced the release of GPT-5, which introduces a new architecture for chain-of-thought reasoning. The model can process text, images, and audio simultaneously with higher accuracy than previous versions.',
    whyItMatters: 'This advancement could reshape how AI is used in healthcare diagnostics, scientific research, and education. The improved reasoning capabilities bring AI closer to handling complex professional tasks.',
    sources: ['OpenAI Blog', 'MIT Technology Review', 'The Verge'],
    sourceCount: 3, verification: 'verified', time: '12 min ago', important: true,
    timeline: [
      { time: '9:00 AM', text: 'OpenAI publishes research paper' },
      { time: '10:30 AM', text: 'Official announcement and demo' },
      { time: '11:45 AM', text: 'API access begins rolling out' }
    ],
    perspectives: { known: 'GPT-5 outperforms GPT-4 on major benchmarks by 15-30%.', different: 'Some researchers praise the reasoning abilities while others express concerns about evaluation methodology.', uncertain: 'Long-term impact on job markets and the timeline for broader availability remain unclear.' }
  },
  {
    id: 'n2', category: 'Technology', headline: 'Apple Announces AR Glasses for Consumer Market',
    summary: 'Apple has officially revealed lightweight augmented reality glasses designed for everyday use, priced significantly lower than Vision Pro. The device weighs under 100 grams and offers 4-hour battery life.',
    whatHappened: 'At a special event, Apple introduced Apple Glass, a consumer-grade AR device that looks like regular eyeglasses. It features spatial computing, real-time translation, and navigation overlays.',
    whyItMatters: 'This could mark the beginning of mainstream AR adoption. Unlike bulky headsets, these glasses are designed for all-day wear, potentially changing how we interact with digital information.',
    sources: ['Apple Newsroom', 'Bloomberg', 'TechCrunch'],
    sourceCount: 3, verification: 'verified', time: '28 min ago', important: true,
    timeline: [
      { time: '1:00 PM', text: 'Apple event begins' },
      { time: '1:35 PM', text: 'AR Glasses unveiled' },
      { time: '2:00 PM', text: 'Pricing and availability announced' }
    ],
    perspectives: { known: 'The device will launch at $999, significantly below Vision Pro.', different: 'Tech analysts are divided on whether the limited FOV is acceptable for mainstream users.', uncertain: 'Developer ecosystem readiness and real-world battery performance need verification.' }
  },
  {
    id: 'n3', category: 'Science', headline: 'Scientists Create First Room-Temperature Superconductor',
    summary: 'A team at MIT has demonstrated a material that conducts electricity with zero resistance at room temperature and ambient pressure, a breakthrough that has eluded physicists for over a century.',
    whatHappened: 'Researchers published peer-reviewed findings showing a novel hydrogen-rich compound achieves superconductivity at 22°C and standard atmospheric pressure. The results have been independently replicated by two other labs.',
    whyItMatters: 'Room-temperature superconductors could revolutionize power grids, making energy transmission nearly lossless. It could also enable faster computers, better MRI machines, and practical fusion reactors.',
    sources: ['Nature', 'MIT News', 'Physical Review Letters', 'Science Magazine'],
    sourceCount: 4, verification: 'verified', time: '1 hr ago', important: true,
    timeline: [
      { time: 'Mar 2026', text: 'Initial paper submitted' },
      { time: 'May 2026', text: 'Peer review completed' },
      { time: 'Jul 2026', text: 'Independent replication confirmed' },
      { time: 'Today', text: 'Formal publication in Nature' }
    ],
    perspectives: { known: 'The compound achieves zero resistance at 22°C based on three independent measurements.', different: 'While physicists celebrate, some caution that manufacturing scalability is unproven.', uncertain: 'Whether the material can be produced affordably at industrial scale remains to be determined.' }
  },
  {
    id: 'n4', category: 'Business', headline: 'India Becomes World\'s Fourth Largest Economy',
    summary: 'India has officially overtaken Japan to become the world\'s fourth-largest economy by nominal GDP, according to IMF data released today. The milestone reflects strong growth in technology, services, and manufacturing sectors.',
    whatHappened: 'The International Monetary Fund confirmed that India\'s nominal GDP has surpassed Japan\'s, placing India behind only the US, China, and Germany in global economic rankings.',
    whyItMatters: 'This shift signals India\'s growing influence in global trade and investment. It may attract more foreign investment and strengthen India\'s position in international economic negotiations.',
    sources: ['IMF', 'Reuters', 'Economic Times'],
    sourceCount: 3, verification: 'verified', time: '2 hrs ago', important: true,
    perspectives: { known: 'India\'s GDP has crossed $4.5 trillion.', different: 'Economists note that per-capita income remains significantly lower than Japan\'s.', uncertain: 'Sustainability of current growth rates amid global economic headwinds.' }
  },
  {
    id: 'n5', category: 'Sports', headline: 'India Wins Historic Test Series in Australia',
    summary: 'India secured a historic 3-1 Test series victory in Australia, retaining the Border-Gavaskar Trophy for the fifth consecutive time. The decisive fifth Test ended with a 7-wicket win.',
    whatHappened: 'India chased down 251 runs on the final day at the SCG with 7 wickets in hand. The series featured outstanding performances from both teams across five closely contested matches.',
    whyItMatters: 'This cements India\'s dominance in the rivalry and strengthens their position in the ICC World Test Championship standings. It\'s considered one of the greatest away series wins.',
    sources: ['ESPNcricinfo', 'ICC', 'Cricket Australia'],
    sourceCount: 3, verification: 'verified', time: '3 hrs ago', important: false,
    perspectives: { known: 'India won the series 3-1 with victories in Melbourne, Brisbane, and Sydney.', different: 'Australian cricket board has called for a review of team selection and strategy.', uncertain: 'Impact on upcoming WTC final qualification scenarios.' }
  },
  {
    id: 'n6', category: 'Space', headline: 'SpaceX Starship Completes First Orbital Refueling',
    summary: 'SpaceX has successfully demonstrated orbital propellant transfer between two Starship vehicles, a critical milestone for NASA\'s Artemis moon-landing program and future Mars missions.',
    whatHappened: 'Two Starship vehicles rendezvoused in low Earth orbit and transferred 100 metric tons of liquid methane and oxygen. The operation lasted approximately 45 minutes.',
    whyItMatters: 'Orbital refueling is essential for deep-space missions. Without it, spacecraft cannot carry enough fuel to reach the Moon\'s surface or travel to Mars. This test validates the core technology.',
    sources: ['SpaceX', 'NASA', 'Ars Technica'],
    sourceCount: 3, verification: 'verified', time: '4 hrs ago', important: true,
    timeline: [
      { time: '6:00 AM', text: 'Tanker Starship launches from Boca Chica' },
      { time: '6:12 AM', text: 'Reaches low Earth orbit' },
      { time: '7:30 AM', text: 'Depot Starship approaches for docking' },
      { time: '8:15 AM', text: 'Propellant transfer completed successfully' }
    ],
    perspectives: { known: '100 metric tons of propellant were transferred successfully.', different: 'SpaceX calls it a complete success; independent analysts note some telemetry gaps during transfer.', uncertain: 'Whether the system can scale to the 10+ refueling missions needed for a Mars trip.' }
  },
  {
    id: 'n7', category: 'Gaming', headline: 'GTA VI Release Date Confirmed for October 2026',
    summary: 'Rockstar Games has confirmed Grand Theft Auto VI will launch on October 27, 2026, for PS5 and Xbox Series X|S. A PC version will follow in early 2027.',
    whatHappened: 'Rockstar released a new trailer and confirmed the release date, ending months of speculation. The game is set in a fictional version of Miami with the largest open world in GTA history.',
    whyItMatters: 'GTA V is one of the best-selling games of all time. GTA VI is expected to set new records and could significantly boost console sales heading into the holiday season.',
    sources: ['Rockstar Games', 'IGN', 'GameSpot'],
    sourceCount: 3, verification: 'verified', time: '5 hrs ago', important: false,
    perspectives: { known: 'October 27, 2026 launch on consoles confirmed.', different: 'Gaming analysts debate whether the delayed PC launch will push players to consoles or create backlash.', uncertain: 'Exact PC release date and system requirements.' }
  },
  {
    id: 'n8', category: 'AI', headline: 'EU Passes Comprehensive AI Regulation Framework',
    summary: 'The European Union has enacted the world\'s most comprehensive AI regulation, banning social scoring, restricting biometric surveillance, and requiring transparency for AI-generated content.',
    whatHappened: 'The EU AI Act entered into force, establishing risk-based categories for AI systems. High-risk applications in healthcare, law enforcement, and education face strict oversight and mandatory audits.',
    whyItMatters: 'This sets a global precedent. Companies worldwide must comply if they serve EU users, potentially influencing AI regulation in the US, India, and other major markets.',
    sources: ['European Commission', 'Reuters', 'Wired', 'Financial Times'],
    sourceCount: 4, verification: 'verified', time: '6 hrs ago', important: true,
    perspectives: { known: 'The Act bans AI social scoring and real-time biometric surveillance in most cases.', different: 'Tech companies criticize compliance costs; civil rights groups say it doesn\'t go far enough.', uncertain: 'How enforcement will work across 27 member states with varying technical capacity.' }
  },
  {
    id: 'n9', category: 'India', headline: 'India Launches Digital Health ID for All Citizens',
    summary: 'The Indian government has rolled out a universal digital health ID linked to Aadhaar, enabling seamless access to medical records, prescriptions, and insurance across all hospitals nationwide.',
    whatHappened: 'The Health Ministry launched the Ayushman Bharat Digital Mission\'s universal health ID, which creates a single digital health profile for every Indian citizen. Over 50 million IDs were generated in the first week.',
    whyItMatters: 'This could transform India\'s healthcare system by reducing paperwork, enabling telemedicine, and giving doctors instant access to patient history, especially critical in emergencies.',
    sources: ['Ministry of Health', 'The Hindu', 'NDTV'],
    sourceCount: 3, verification: 'verified', time: '7 hrs ago', important: true,
    perspectives: { known: 'The system is live and integrated with major hospital chains.', different: 'Privacy advocates raise concerns about centralized health data; the government emphasizes data encryption.', uncertain: 'Adoption rates in rural areas where digital literacy remains low.' }
  },
  {
    id: 'n10', category: 'Technology', headline: 'Quantum Computer Solves Problem in 4 Minutes That Would Take Classical Computer 47 Years',
    summary: 'Google\'s latest quantum processor has solved a complex optimization problem in under 4 minutes, a task estimated to take the world\'s fastest classical supercomputer approximately 47 years.',
    whatHappened: 'Google\'s Willow quantum chip, featuring 1,000 logical qubits, demonstrated practical quantum advantage on a real-world optimization problem related to drug molecular simulation.',
    whyItMatters: 'This moves quantum computing from theoretical advantage to practical applications. Drug discovery, materials science, and cryptography could all be transformed within this decade.',
    sources: ['Google AI Blog', 'Nature', 'New Scientist'],
    sourceCount: 3, verification: 'verified', time: '8 hrs ago', important: true,
    timeline: [
      { time: 'Jan 2026', text: 'Willow chip fabrication completed' },
      { time: 'Apr 2026', text: 'Internal benchmarks exceed expectations' },
      { time: 'Today', text: 'Results published in Nature' }
    ],
    perspectives: { known: 'The 4-minute computation result has been verified by independent quantum computing researchers.', different: 'IBM suggests the classical comparison may be overstated; Google stands by the methodology.', uncertain: 'Timeline for commercially available quantum drug discovery remains debated.' }
  },
  {
    id: 'n11', category: 'World', headline: 'UN Climate Summit Reaches Historic Emissions Agreement',
    summary: 'Nearly 200 nations have agreed to legally binding emissions reduction targets, committing to a 60% cut by 2035. The agreement includes a $200 billion annual fund for developing nations.',
    whatHappened: 'After two weeks of negotiations, the UN Climate Summit concluded with a landmark agreement. For the first time, fossil fuel phase-down targets include specific dates and penalties for non-compliance.',
    whyItMatters: 'Previous climate agreements lacked enforcement. This agreement includes trade penalties for non-compliance, making it the most consequential climate deal in history.',
    sources: ['United Nations', 'BBC', 'The Guardian', 'Al Jazeera'],
    sourceCount: 4, verification: 'verified', time: '9 hrs ago', important: true,
    perspectives: { known: '194 nations signed the agreement with specific reduction targets.', different: 'Small island nations say targets are still insufficient; major emitters call them ambitious but achievable.', uncertain: 'Whether enforcement mechanisms will withstand political changes in key countries.' }
  },
  {
    id: 'n12', category: 'Education', headline: 'India\'s NEP 2020 Shows Major Results in STEM Enrollment',
    summary: 'Five years after implementation, India\'s National Education Policy has resulted in a 40% increase in STEM enrollment among girls and a significant rise in vocational training participation.',
    whatHappened: 'The Ministry of Education released a comprehensive review showing NEP 2020\'s impact: higher STEM enrollment, more flexible curriculum adoption, and growth in mother-tongue instruction at university level.',
    whyItMatters: 'Education reform at this scale affects over 250 million students. The results suggest structural changes in how India develops its future workforce.',
    sources: ['Ministry of Education', 'India Today', 'The Print'],
    sourceCount: 3, verification: 'verified', time: '10 hrs ago', important: false,
    perspectives: { known: 'STEM enrollment among girls increased 40% since 2020.', different: 'Some states report smoother implementation than others; rural schools face resource constraints.', uncertain: 'Long-term employment outcomes for students under the new framework.' }
  },
  {
    id: 'n13', category: 'Finance', headline: 'RBI Launches Digital Rupee for Retail Payments Nationwide',
    summary: 'The Reserve Bank of India has expanded its digital rupee (e₹) pilot to all banks and payment platforms, enabling instant, fee-free digital currency transactions across India.',
    whatHappened: 'After a successful pilot phase, RBI announced nationwide availability of e₹ through all major banking apps and UPI platforms. The digital rupee works offline for transactions up to ₹500.',
    whyItMatters: 'India\'s digital rupee could reduce dependence on physical cash, lower transaction costs for small merchants, and enable financial inclusion in areas with limited banking infrastructure.',
    sources: ['Reserve Bank of India', 'Mint', 'Business Standard'],
    sourceCount: 3, verification: 'verified', time: '11 hrs ago', important: true,
    perspectives: { known: 'e₹ is now available through all major banking apps with offline capability.', different: 'Banks welcome the integration; privacy advocates question transaction tracking capabilities.', uncertain: 'Adoption rate compared to UPI, which is already deeply entrenched in daily transactions.' }
  },
  {
    id: 'n14', category: 'Startups', headline: 'Bangalore Startup Creates Affordable Carbon Capture Device',
    summary: 'CarbonZero, a Bangalore-based startup, has developed a modular carbon capture device that costs 80% less than existing solutions and can be installed on factory rooftops.',
    whatHappened: 'The startup unveiled a refrigerator-sized device that captures CO₂ from industrial emissions at $50 per ton, compared to the current industry average of $250-600 per ton. The technology uses a novel bio-mineral filtration process.',
    whyItMatters: 'Affordable carbon capture is considered essential for meeting climate targets. If this technology scales, it could make emissions reduction economically viable for small and medium industries worldwide.',
    sources: ['YourStory', 'TechCrunch India', 'Economic Times'],
    sourceCount: 3, verification: 'developing', time: '12 hrs ago', important: false,
    timeline: [
      { time: 'Jan 2026', text: 'Prototype testing begins' },
      { time: 'May 2026', text: 'First factory installation' },
      { time: 'Today', text: 'Commercial launch announcement' }
    ],
    perspectives: { known: 'The device has been tested in 3 factories over 6 months.', different: 'Climate scientists are cautiously optimistic; some engineers question long-term filter durability.', uncertain: 'Independent verification of the $50/ton cost claim is pending.' }
  },
  {
    id: 'n15', category: 'Entertainment', headline: 'Christopher Nolan\'s New Film Breaks Global Box Office Record',
    summary: 'Christopher Nolan\'s latest sci-fi epic "Meridian" has grossed $1.2 billion worldwide in its opening weekend, breaking the all-time record previously held by Avengers: Endgame.',
    whatHappened: 'The film, shot entirely in IMAX 70mm, opened in 85 countries simultaneously. It explores the concept of parallel timelines and features an ensemble cast led by Cillian Murphy and Zendaya.',
    whyItMatters: 'This demonstrates that original, non-franchise films can still achieve massive commercial success, potentially encouraging studios to invest in more original storytelling.',
    sources: ['Box Office Mojo', 'Variety', 'The Hollywood Reporter'],
    sourceCount: 3, verification: 'verified', time: '14 hrs ago', important: false,
    perspectives: { known: '$1.2 billion opening weekend across 85 countries.', different: 'Critics are divided between calling it a masterpiece and finding the plot overly complex.', uncertain: 'Whether this will sustain momentum or follow a steep second-weekend drop.' }
  },
  {
    id: 'n16', category: 'AI', headline: 'AI Diagnoses Rare Diseases Faster Than Specialist Doctors',
    summary: 'A new AI system developed by DeepMind has outperformed specialist physicians in diagnosing rare genetic diseases, reducing average diagnosis time from 5 years to under 2 weeks.',
    whatHappened: 'In a clinical trial across 12 hospitals, the AI analyzed genetic data, symptoms, and medical history to accurately identify rare diseases in 92% of cases, compared to 60% by specialists within the same timeframe.',
    whyItMatters: 'Rare disease patients often endure years of misdiagnosis. This AI could dramatically reduce suffering and healthcare costs for millions of patients worldwide.',
    sources: ['The Lancet', 'DeepMind', 'BBC Health'],
    sourceCount: 3, verification: 'verified', time: '16 hrs ago', important: true,
    perspectives: { known: '92% accuracy in a controlled clinical trial across 12 hospitals.', different: 'Medical professionals see it as a powerful diagnostic aid, not a replacement for clinical judgment.', uncertain: 'Regulatory approval timeline and integration with existing hospital systems.' }
  },
  {
    id: 'n17', category: 'Technology', headline: '6G Network Prototype Achieves 1 Terabit Per Second Speed',
    summary: 'Samsung and NTT have demonstrated a 6G wireless prototype achieving 1 Tbps data transfer speed in laboratory conditions, approximately 100 times faster than current 5G networks.',
    whatHappened: 'The prototype uses terahertz frequency bands and advanced beamforming to achieve unprecedented wireless speeds. The demonstration transmitted the equivalent of 125 full-length 4K movies per second.',
    whyItMatters: 'While commercial 6G is years away, this milestone validates theoretical speeds and could enable holographic communication, real-time digital twins, and pervasive AI connectivity.',
    sources: ['Samsung Research', 'IEEE Spectrum', 'Nikkei Asia'],
    sourceCount: 3, verification: 'verified', time: '18 hrs ago', important: false,
    perspectives: { known: '1 Tbps achieved in laboratory conditions using terahertz bands.', different: 'Telecom experts debate whether terahertz signals can work reliably over practical distances.', uncertain: 'Commercial deployment timeline; most estimates suggest 2030-2032.' }
  },
  {
    id: 'n18', category: 'India', headline: 'India\'s Solar Energy Capacity Crosses 200 GW Milestone',
    summary: 'India has officially surpassed 200 GW of installed solar energy capacity, making it the world\'s second-largest solar power producer after China, three years ahead of its original target.',
    whatHappened: 'The Ministry of New & Renewable Energy confirmed the milestone, driven by massive installations in Rajasthan, Gujarat, and Tamil Nadu. India added 45 GW of solar capacity in the last year alone.',
    whyItMatters: 'This accelerates India\'s energy independence and reduces reliance on imported fossil fuels. It also creates millions of jobs in installation, manufacturing, and maintenance.',
    sources: ['Ministry of New & Renewable Energy', 'Reuters', 'LiveMint'],
    sourceCount: 3, verification: 'verified', time: '20 hrs ago', important: true,
    perspectives: { known: '200 GW installed capacity confirmed by official data.', different: 'Industry celebrates the achievement; grid operators note challenges in managing intermittent solar supply.', uncertain: 'Energy storage infrastructure adequacy for handling increased solar generation.' }
  },
  {
    id: 'n19', category: 'Science', headline: 'Lab-Grown Meat Receives Full FDA Approval',
    summary: 'The FDA has granted full approval to three companies for selling lab-grown chicken and beef in US grocery stores, marking a pivotal moment for the cultivated meat industry.',
    whatHappened: 'After years of regulatory review, Upside Foods, Eat Just, and Believer Meats received approval for retail sale. The products will initially be available in select Whole Foods and Walmart locations.',
    whyItMatters: 'Lab-grown meat uses 90% less land and 80% less water than conventional farming. Full FDA approval could accelerate adoption and attract investment to scale production.',
    sources: ['FDA', 'Associated Press', 'Bloomberg'],
    sourceCount: 3, verification: 'verified', time: '22 hrs ago', important: false,
    perspectives: { known: 'Three companies approved for retail sale in US stores.', different: 'Environmentalists applaud the decision; cattle industry associations express competitive concerns.', uncertain: 'Consumer acceptance and price parity with conventional meat.' }
  },
  {
    id: 'n20', category: 'World', headline: 'Global Population Growth Rate Falls Below 0.8% for First Time',
    summary: 'The United Nations reports global population growth has declined to 0.78% annually, the lowest rate in modern history. Several developed nations are now experiencing population decline.',
    whatHappened: 'The UN Population Division\'s mid-year report shows fertility rates falling faster than predicted across all regions. South Korea, Japan, and Italy are seeing the sharpest declines.',
    whyItMatters: 'Declining populations strain pension systems, reduce workforce availability, and could reshape global economics. Countries must adapt social safety nets for aging populations.',
    sources: ['United Nations', 'The Economist', 'Washington Post'],
    sourceCount: 3, verification: 'verified', time: '1 day ago', important: true,
    perspectives: { known: '0.78% annual growth rate confirmed by UN data.', different: 'Environmentalists see reduced pressure on resources; economists worry about shrinking workforces.', uncertain: 'Whether pro-natalist policies in various countries will reverse the trend.' }
  },
  {
    id: 'n21', category: 'Gaming', headline: 'Nintendo Switch 2 Outsells Original Switch Launch Numbers',
    summary: 'Nintendo\'s Switch 2 sold 8 million units in its first month, surpassing the original Switch\'s launch record. Backward compatibility and a new Zelda title drove unprecedented demand.',
    whatHappened: 'The Switch 2, featuring 4K output and enhanced processing power, launched worldwide with full backward compatibility for existing Switch games. The new Legend of Zelda title sold 5 million copies on day one.',
    whyItMatters: 'Nintendo\'s successful launch proves the hybrid console concept has lasting appeal and positions the company strongly against PlayStation and Xbox in the current generation.',
    sources: ['Nintendo', 'Famitsu', 'Kotaku'],
    sourceCount: 3, verification: 'verified', time: '1 day ago', important: false,
    perspectives: { known: '8 million units sold in the first month.', different: 'Analysts debate whether the momentum is sustainable or driven by pent-up demand.', uncertain: 'Third-party developer support compared to competing platforms.' }
  },
  {
    id: 'n22', category: 'AI', headline: 'Major Tech Companies Form AI Safety Alliance',
    summary: 'Google, Microsoft, Meta, and 15 other major tech companies have formed the Global AI Safety Alliance, committing to shared safety testing standards and an emergency shutdown protocol.',
    whatHappened: 'The alliance, announced at the World Economic Forum, establishes common benchmarks for AI safety testing, mandatory red-teaming, and a shared incident response framework.',
    whyItMatters: 'Self-regulation by the industry could prevent more restrictive government regulation while establishing safety norms. The alliance covers companies responsible for over 80% of global AI compute.',
    sources: ['World Economic Forum', 'Financial Times', 'MIT Tech Review'],
    sourceCount: 3, verification: 'verified', time: '1 day ago', important: true,
    perspectives: { known: '18 companies signed the alliance charter.', different: 'Some see meaningful progress; critics call it a PR move to preempt regulation.', uncertain: 'Enforcement mechanisms within the alliance and consequences for non-compliance.' }
  },
  {
    id: 'n23', category: 'Business', headline: 'Tata Group Announces $5 Billion Semiconductor Fab in Gujarat',
    summary: 'Tata Electronics has announced a $5 billion semiconductor fabrication facility in Gujarat, set to produce 28nm and 22nm chips. The plant will be India\'s first advanced chip factory.',
    whatHappened: 'The facility, located in the Dholera Special Investment Region, will begin production by 2028. Tata has partnered with TSMC for technology transfer and will initially produce chips for automotive and IoT applications.',
    whyItMatters: 'India currently imports nearly all its semiconductors. Domestic chip manufacturing is critical for supply chain security and supports India\'s growing electronics manufacturing ecosystem.',
    sources: ['Tata Group', 'Economic Times', 'Semiconductor Engineering'],
    sourceCount: 3, verification: 'verified', time: '1 day ago', important: true,
    perspectives: { known: '$5 billion investment confirmed with TSMC partnership.', different: 'Industry welcomes the move; skeptics point to historically high failure rates for new fabs.', uncertain: 'Workforce readiness and the ability to attract skilled semiconductor engineers to Gujarat.' }
  },
  {
    id: 'n24', category: 'Science', headline: 'CRISPR Gene Therapy Cures Sickle Cell Disease in Clinical Trial',
    summary: 'A landmark clinical trial has shown that CRISPR-based gene therapy can effectively cure sickle cell disease, with 94% of patients remaining disease-free after three years of follow-up.',
    whatHappened: 'Vertex Pharmaceuticals reported long-term results showing that 45 out of 48 trial participants have had no sickle cell crises since receiving the one-time CRISPR treatment.',
    whyItMatters: 'Sickle cell disease affects millions worldwide, particularly in Africa and South Asia. A one-time cure could replace lifetime management and prevent severe complications.',
    sources: ['New England Journal of Medicine', 'Vertex Pharmaceuticals', 'Nature Medicine'],
    sourceCount: 3, verification: 'verified', time: '1 day ago', important: true,
    perspectives: { known: '94% efficacy over 3-year follow-up period.', different: 'Medical community celebrates; access advocates worry about the treatment\'s $2.2 million price tag.', uncertain: 'Longer-term safety data and feasibility of scaling to millions of patients globally.' }
  },
  {
    id: 'n25', category: 'Technology', headline: 'Signal Becomes Most Downloaded Messaging App Globally',
    summary: 'End-to-end encrypted messaging app Signal has overtaken WhatsApp and Telegram in monthly downloads, driven by growing privacy concerns and new data protection laws worldwide.',
    whatHappened: 'App analytics firm Sensor Tower reports Signal had 120 million downloads in the past quarter, surpassing WhatsApp (98M) and Telegram (85M). The surge coincides with stricter data protection enforcement in the EU and India.',
    whyItMatters: 'This signals a significant shift in user priorities toward privacy. It could pressure other messaging platforms to strengthen their privacy features.',
    sources: ['Sensor Tower', 'TechCrunch', 'The Verge'],
    sourceCount: 3, verification: 'developing', time: '1 day ago', important: false,
    timeline: [
      { time: 'Q1 2026', text: 'Signal downloads begin rising sharply' },
      { time: 'Q2 2026', text: 'Overtakes Telegram in monthly downloads' },
      { time: 'Today', text: 'Confirmed as most-downloaded messaging app' }
    ],
    perspectives: { known: '120 million downloads in Q2 2026 per Sensor Tower data.', different: 'Privacy advocates celebrate; Meta argues that WhatsApp\'s total user base remains far larger.', uncertain: 'Whether download spikes translate to sustained daily usage.' }
  },
  {
    id: 'n26', category: 'India', headline: 'Chennai Metro Becomes India\'s First Fully Autonomous Metro System',
    summary: 'Chennai Metro Rail has launched India\'s first Grade of Automation 4 (GoA4) fully autonomous metro line, with driverless trains operating on the 25 km Phase 2 corridor.',
    whatHappened: 'The fully automated Line 3 connects Chennai Airport to the city center with 18 stations. Trains operate without any onboard staff, monitored entirely from a central control room.',
    whyItMatters: 'Autonomous metro systems reduce operational costs and improve reliability. This positions Chennai as a leader in smart urban transit and could serve as a model for other Indian cities.',
    sources: ['Chennai Metro Rail', 'The Hindu', 'Indian Express'],
    sourceCount: 3, verification: 'verified', time: '2 days ago', important: false,
    perspectives: { known: 'GoA4 autonomous operations confirmed on the 25 km Line 3.', different: 'Transit experts praise the technology; some commuters express initial safety concerns about driverless trains.', uncertain: 'Expansion plans for full network automation.' }
  },
  {
    id: 'n27', category: 'Space', headline: 'ISRO Successfully Tests Reusable Launch Vehicle',
    summary: 'ISRO has successfully completed the landing experiment of its Reusable Launch Vehicle (RLV-TD), bringing India closer to developing a fully reusable space shuttle that could reduce launch costs by 80%.',
    whatHappened: 'The RLV-TD was released from a helicopter at 4.5 km altitude and autonomously navigated to a precise landing on a runway at SDSC SHAR. This was the third successful landing test.',
    whyItMatters: 'Reusable rockets dramatically cut space access costs. India\'s indigenous reusable vehicle could make ISRO the most cost-effective space agency and attract international commercial launches.',
    sources: ['ISRO', 'Space.com', 'The Times of India'],
    sourceCount: 3, verification: 'verified', time: '2 days ago', important: true,
    perspectives: { known: 'Third successful autonomous landing test completed.', different: 'Space industry analysts praise the progress; some note the technology is still years from operational flights.', uncertain: 'Timeline for first orbital flight test of the full-scale vehicle.' }
  },
  {
    id: 'n28', category: 'Finance', headline: 'Sensex Crosses 90,000 for the First Time',
    summary: 'The BSE Sensex has crossed the historic 90,000 mark, driven by strong foreign institutional investment, robust corporate earnings, and India\'s growing prominence in global markets.',
    whatHappened: 'The benchmark index touched 90,127 during intraday trading before closing at 89,985. IT, banking, and renewable energy stocks led the rally. FII inflows exceeded ₹50,000 crore this month.',
    whyItMatters: 'The milestone reflects confidence in India\'s economic trajectory. However, valuations at these levels raise questions about sustainability and potential corrections.',
    sources: ['BSE', 'MoneyControl', 'Bloomberg'],
    sourceCount: 3, verification: 'verified', time: '2 days ago', important: false,
    perspectives: { known: 'Sensex touched 90,127 intraday.', different: 'Bulls point to strong fundamentals; bears warn of stretched valuations.', uncertain: 'Whether current FII inflow levels will sustain through potential US rate changes.' }
  },
  {
    id: 'n29', category: 'Startups', headline: 'Indian Startup Ecosystem Crosses $500 Billion Total Valuation',
    summary: 'India\'s startup ecosystem has crossed $500 billion in cumulative valuation, with 120 unicorns and growing strength in AI, climate tech, and deep tech sectors.',
    whatHappened: 'NASSCOM\'s annual report shows Indian startups raised $28 billion in the past year, with AI startups accounting for 30% of funding. The number of unicorns grew from 108 to 120.',
    whyItMatters: 'India is cementing its position as the world\'s third-largest startup ecosystem. The shift toward deep tech and climate tech suggests maturation beyond consumer internet companies.',
    sources: ['NASSCOM', 'Inc42', 'YourStory'],
    sourceCount: 3, verification: 'verified', time: '2 days ago', important: false,
    perspectives: { known: '$500 billion cumulative valuation with 120 unicorns.', different: 'Investors are optimistic about AI and climate tech; some founders report tighter due diligence compared to 2021.', uncertain: 'Sustainability of current AI startup valuations.' }
  },
  {
    id: 'n30', category: 'Entertainment', headline: 'India\'s First AI-Generated Feature Film Premieres at Cannes',
    summary: 'An Indian production house has premiered the world\'s first feature-length film created primarily using AI tools at the Cannes Film Festival, sparking both acclaim and controversy.',
    whatHappened: 'The film "Echoes of Tomorrow" uses AI for visual effects, voice synthesis, and scene generation, with human directors providing creative direction. It received a 7-minute standing ovation and also faced protests.',
    whyItMatters: 'This tests the boundaries of AI in creative industries. The film\'s reception could influence how studios, unions, and regulators approach AI in entertainment.',
    sources: ['Cannes Film Festival', 'Variety', 'Hindustan Times'],
    sourceCount: 3, verification: 'verified', time: '3 days ago', important: false,
    perspectives: { known: 'The film premiered at Cannes with mixed but notable reception.', different: 'Directors see it as a tool for democratizing filmmaking; actors\' unions call it a threat to livelihoods.', uncertain: 'Legal frameworks for AI-generated content in the entertainment industry.' }
  }
];
