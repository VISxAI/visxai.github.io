export interface Example {
	title: string;
	url: string;
	authors: string;
	year: number;
	image?: string;
	id?: string; // for internal linking if needed
}

export interface ImportantDate {
	date: string;
	event: string;
	strikethrough?: boolean;
}

export interface SessionItem {
	title: string;
	url?: string;
	authors: string;
}

export interface Session {
	time: string;
	title: string;
	content?: string;
	items?: SessionItem[];
}

export interface HallOfFameEntry {
	year: number;
	items: { title: string; url: string; authors: string }[];
}

export interface Person {
	name: string;
	affiliation?: string;
	url?: string;
}

export interface YearData {
	year: number;
	title: string;
	location: string;
	date: string;
	intro: string[];
	examples: Example[];
	dates: ImportantDate[];
	program: Session[];
	callForParticipation: string;
	organizers: Person[];
	steeringCommittee: Person[];
	pc: string[];
	banner?: string;
}

export const bestPapers: Record<number, { title: string; url: string; authors: string }[]> = {
	2024: [
		{
			title: 'Can Large Language Models Explain Their Internal Mechanisms?',
			url: 'https://pair.withgoogle.com/explorables/patchscopes/',
			authors:
				'Nada Hussein, Asma Ghandeharioun, Ryan Mullins, Emily Reif, Jimbo Wilson, Nithum Thain, Lucas Dixon'
		},
		{
			title: 'The Illustrated AlphaFold',
			url: 'https://elanapearl.github.io/blog/2024/the-illustrated-alphafold/',
			authors: 'Elana P Simon, Jake Silberg'
		}
	],
	2023: [
		{
			title: "PAC Learning Or: Why We Should (and Shouldn't) Trust Machine Learning",
			url: 'https://www.cs.brandeis.edu/~dylan/pac_learning/',
			authors: 'Dylan Cashman'
		},
		{
			title: 'Understanding and Comparing Multi-Modal Models',
			url: 'https://jku-vds-lab.github.io/amumo',
			authors: 'Christina Humer, Vidya Prasad, Marc Streit, Hendrik Strobelt'
		},
		{
			title: 'Do Machine Learning Models Memorize or Generalize?',
			url: 'https://pair.withgoogle.com/explorables/grokking/',
			authors:
				'Adam Pearce, Asma Ghandeharioun, Nada Hussein, Nithum Thain, Martin Wattenberg, Lucas Dixon'
		}
	],
	2022: [
		{
			title: 'K-Means Clustering: An Explorable Explainer',
			url: 'https://k-means-explorable.vercel.app/',
			authors: 'Yi Zhe Ang'
		},
		{
			title: 'Poisoning Attacks and Subpopulation Susceptibility',
			url: 'https://uvasrg.github.io/poisoning/',
			authors: 'Evan Rose, Fnu Suya, David Evans'
		}
	],
	2021: [
		{
			title: 'What Have Language Models Learned?',
			url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
			authors: 'Adam Pearce'
		},
		{
			title:
				'Feature Sonification: An investigation on the features learned for Automatic Speech Recognition',
			url: 'http://www.cs.umd.edu/~amin/apps/visxai/sonification/',
			authors: 'Amin Ghiasi, Hamid Kazemi, W. Ronny Huang, Emily Liu, Micah Goldblum, Tom Goldstein'
		}
	],
	2020: [
		{
			title: 'Comparing DNNs with UMAP Tour',
			url: 'https://tiga1231.github.io/umap-tour/',
			authors: 'Mingwei Li and Carlos Scheidegger'
		},
		{
			title: 'How Does a Computer "See" Gender?',
			url: 'https://www.pewresearch.org/interactives/how-does-a-computer-see-gender/',
			authors: 'Stefan Wojcik, Emma Remy, and Chris Baronavski'
		}
	],
	2019: [
		{
			title: 'What if we Reduce the Memory of an Artificial Doom Player?',
			url: 'https://theo-jaunet.github.io/MemoryReduction/',
			authors: 'Theo Jaunet, Romain Vuillemot, and Christian Wolf'
		},
		{
			title: 'Statistical Distances and Their Implications to GAN Training',
			url: 'https://qnkxsovc.gitlab.io/prob-vis/',
			authors: 'Max Daniels'
		},
		{
			title: 'Selecting the right tool for the job: a comparison of visualization algorithms',
			url: 'https://mybinder.org/v2/gh/KrishnaswamyLab/visualization_selection/master?filepath=Selecting_the_right_tool_for_the_job.ipynb',
			authors: 'Daniel Burkhardt, Scott Gigante, and Smita Krishnaswamy'
		}
	],
	2018: [
		{
			title: 'A Visual Exploration of Gaussian Processes',
			url: 'https://www.jgoertler.com/visual-exploration-gaussian-processes/',
			authors: 'Jochen Görtler, Rebecca Kehlbeck and Oliver Deussen'
		},
		{
			title: "The Beginner's Guide to Dimensionality Reduction",
			url: 'https://idyll.pub/post/visxai-dimensionality-reduction-1dbad0a67a092b007c526a45/',
			authors: 'Matthew Conlen and Fred Hohman'
		},
		{
			title: 'Roads from Above',
			url: 'https://roadsfromabove.netlify.com/',
			authors: 'Greg More, Slaven Marusic and Caihao Cui'
		}
	]
};

export const years: Record<number, YearData> = {
	2025: {
		year: 2025,
		title: '8th Workshop on Visualization for AI Explainability',
		location: 'Vienna, Austria',
		date: 'November 2, 2025',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: 'What Have Language Models Learned?',
				url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
				authors: 'Adam Pearce',
				year: 2021
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'K-Means Clustering: An Explorable Explainer',
				url: 'https://k-means-explorable.vercel.app/',
				authors: 'Yi Zhe Ang',
				year: 2022
			},
			{
				title: 'Comparing DNNs with UMAP Tour',
				url: 'https://tiga1231.github.io/umap-tour/',
				authors: 'Li and Scheidegger',
				year: 2020
			},
			{
				title: 'Can Large Language Models Explain Their Internal Mechanisms?',
				url: 'https://pair.withgoogle.com/explorables/patchscopes/',
				authors: 'Hussein, Ghandeharioun, Mullins, Reif, Wilson, Thain, Dixon',
				year: 2024
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			},
			{
				title: "The Beginner's Guide to Dimensionality Reduction",
				url: 'https://idyll.pub/post/visxai-dimensionality-reduction-1dbad0a67a092b007c526a45/',
				authors: 'Conlen and Hohman',
				year: 2018
			}
		],
		dates: [
			{ date: 'August 6, 2025, anywhere', event: 'Submission Deadline' },
			{ date: 'September 8, 2025', event: 'Author Notification' },
			{ date: 'October 1, 2025', event: 'Camera Ready Deadline' }
		],
		program: [
			{ time: '9:00am', title: 'Welcome from the Organizers' },
			{
				time: '9:10 -- 10:30',
				title: 'Session I: Lightning Talks',
				items: [
					{
						title: 'Learning as Choosing a Loss Distribution',
						url: 'https://github.com/feedbackward/offgen',
						authors: 'Matthew J Holland'
					},
					{
						title: 'LIME and SHAP Explained: From Computation to Interpretation',
						url: 'https://aeri206.github.io/explaining-explainable-ml/',
						authors: 'Aeri Cho, Jeongmin Rhee, Seokhyeon Park, Jinwook Seo'
					},
					{
						title: 'Transformer Explainer: LLM Transformer Model Visually Explained',
						url: 'https://poloclub.github.io/transformer-explainer/',
						authors:
							'Cho, Aeree, Kim, Grace C., Karpekov, Alexander, Helbling, Alec, Wang, Zijie J., Lee, Seongmin, Hoover, Benjamin, Chau, Duen Horng'
					},
					{
						title: 'The Mystery of In-Context Learning: How Transformers Learn Patterns',
						url: 'https://induction-spotlight.vercel.app/',
						authors: 'Sundara Srivathsan, Lighittha PR, Prithivraj S, Suganya Ramamoorthy'
					},
					{
						title:
							'ICL‑Scope: Peering Inside In‑Context Learning with Real‑Time Interactive Visualisation',
						url: 'https://icl-vis-ui.vercel.app/',
						authors: 'Bhaskarjit Sarmah, Reetu Raj Harsh'
					},
					{
						title:
							'ESCAPE - Explaining Stable Diffusion via Cross Attention Maps and Prompt Editing',
						url: 'https://escape.ivia.ch/',
						authors:
							'Diego Zafferani, Giovanni De Muri, Johanna Hedlund Lindmar, Akmal Ashirmatov, Sinie van der Ben, Rita Sevastjanova, Mennatallah El-Assady'
					},
					{
						title: 'Patch Explorer',
						url: 'http://patch.baulab.info/demo/',
						authors: 'Imke Grabe, Jaden Fiotto-Kaufman, Rohit Gandikota, David Bau'
					},
					{
						title: 'GFlowNet Playground - Theory and Examples for an Intuitive Understanding',
						url: 'https://gfn-playground.jku-vds-lab.at',
						authors:
							'Florian Holeczek, Alexander Hillisch, Andreas Hinterreiter, Alex Hernández-García, Marc Streit, Christina Humer'
					},
					{
						title: 'The Illustrated Evo2',
						url: 'https://research.nvidia.com/labs/dbr/blog/illustrated-evo2/',
						authors:
							'Jared Wilber, Farhad Ramezanghorbani, Tyler Carter Shimko, John St John, David Romero'
					}
				]
			},
			{ time: '10:30 -- 11:00', title: 'Break' },
			{
				time: '11:00 -- 12:30',
				title: 'Session II: VISxAI Unconf',
				content:
					"Come by to discuss what's hot in VIS + AI, meet new people, and build community! 1 hour: break outs. 30min: share outs."
			},
			{ time: '12:30 -- 2:00', title: 'Lunch Break' },
			{
				time: '2:00 -- 3:30',
				title:
					'Session III: Fireside Chat (with original VISxAI Organizers!): Hendrik Strobelt, Adam Perer, Menna El-Assady',
				content:
					'How has the intersection of visualization and machine learning changed since the first VISxAI (2018)?'
			},
			{ time: '3:30 -- 4:00', title: 'Break' },
			{
				time: '4:00 -- 5:30',
				title: 'Session IV: Closing Keynote: Martin Wattenberg - @wattenberg'
			},
			{ time: '5:30', title: 'Closing' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks. In addition we also accept position papers in a more traditional form.',

		organizers: [
			{ name: 'Alex Bäuerle', affiliation: 'Google DeepMind' },
			{ name: 'Angie Boggust', affiliation: 'Massachusetts Institute of Technology' },
			{ name: 'Catherine Yeh', affiliation: 'Harvard University' },
			{ name: 'Fred Hohman', affiliation: 'Apple' }
		],
		steeringCommittee: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'ETH AI Center' }
		],
		pc: [
			'Jane Adams',
			'Lena Armstrong',
			'Robin Chan',
			'Jyotikrishna Dass',
			'Zoe De Simone',
			'Angus Forbes',
			'Racquel Fygenson',
			'Madeleine Grunde-McLaughlin',
			'Alec Helbling',
			'Aspen Hopkins',
			'Seongmin Lee',
			'Katelyn Morrison',
			'Kushin Mukherjee',
			'Nikhil Prakash',
			'Emily Reif',
			'Rita Sevastjanova',
			'Venkatesh Sivaraman',
			'James Wexler',
			'Haoyang Yang'
		]
	},
	2024: {
		year: 2024,
		title: '7th Workshop on Visualization for AI Explainability',
		location: 'St. Pete Beach, Florida',
		date: 'October 13, 2024',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: 'What Have Language Models Learned?',
				url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
				authors: 'Adam Pearce',
				year: 2021
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'K-Means Clustering: An Explorable Explainer',
				url: 'https://k-means-explorable.vercel.app/',
				authors: 'Yi Zhe Ang',
				year: 2022
			},
			{
				title: 'Comparing DNNs with UMAP Tour',
				url: 'https://tiga1231.github.io/umap-tour/',
				authors: 'Li and Scheidegger',
				year: 2020
			},
			{
				title: "PAC Learning Or: Why We Should (and Shouldn't) Trust Machine Learning",
				url: 'https://www.cs.brandeis.edu/~dylan/pac_learning/',
				authors: 'Cashman',
				year: 2023
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			},
			{
				title: "The Beginner's Guide to Dimensionality Reduction",
				url: 'https://idyll.pub/post/visxai-dimensionality-reduction-1dbad0a67a092b007c526a45/',
				authors: 'Conlen and Hohman',
				year: 2018
			}
		],
		dates: [
			{ date: 'August 06, 2024, anywhere', event: 'Submission Deadline' },
			{ date: 'September 10, 2024', event: 'Author Notification' },
			{ date: 'October 1, 2024', event: 'Camera Ready Deadline' },
			{ date: 'October 13, 2024', event: 'Morning Session (ET)' }
		],
		program: [
			{ time: '8:30am', title: 'Welcome from the Organizers' },
			{ time: '', title: 'Session I (75 minutes)' },
			{
				time: '8:35 -- 9:15',
				title:
					'Opening Keynote: David Bau - <a href="https://x.com/davidbau" target="_blank">@davidbau</a>',
				content:
					'Resilience and Human Understanding in AI - What is the role of human understanding in AI? As increasingly massive AI systems are deployed into an unpredictable and complex world, interpretability and controllability are the keys to achieving resilience. We discuss results in understanding and editing large-scale transformer language models and diffusion image synthesis models, and how these are part of an emerging research agenda in interpretable generative AI. Finally, we talk about the concentration of power that is emerging due to the scaling up of large-scale AI, and the kind of infrastructure that will be needed to ensure broad and democratized human participation in the future of AI.'
			},
			{
				time: '9:15 -- 9:45',
				title: 'Lightning Talks I',
				items: [
					{
						title: 'Can Large Language Models Explain Their Internal Mechanisms?',
						url: 'https://pair.withgoogle.com/explorables/patchscopes/',
						authors:
							'Nada Hussein, Asma Ghandeharioun, Ryan Mullins, Emily Reif, Jimbo Wilson, Nithum Thain, Lucas Dixon'
					},
					{
						title: 'The Matrix Arcade: A Visual Explorable of Matrix Transformations',
						url: 'https://yizhe-ang.github.io/matrix-explorable/',
						authors: 'Yi Zhe Ang'
					},
					{
						title: 'Explaining Text-to-Command Conversational Models',
						url: 'https://www.explain-text-to-command.com/',
						authors: 'Petar Stupar, Prof. Dr. Gregory Mermoud, Jean-Philippe Vasseur'
					},
					{
						title: 'TalkToRanker: A Conversational Interface for Ranking-based Decision-Making',
						url: 'http://talktoranker.njitvis.com/',
						authors: 'Conor Fitzpatrick, Jun Yuan, Aritra Dasgupta'
					},
					{
						title: 'Where is the information in data?',
						url: 'https://murphyka.github.io/information_explorable/',
						authors: 'Kieran Murphy, Dani S. Bassett'
					},
					{
						title:
							'Explainability Perspectives on a Vision Transformer: From Global Architecture to Single Neuron',
						url: 'https://explainability-vit.ivia.ch/',
						authors:
							'Anne Marx, Yumi Kim, Luca Sichi, Diego Arapovic, Javier Sanguino Bautiste, Rita Sevastjanova, Mennatallah El-Assady'
					}
				]
			},
			{ time: '9:45 -- 10:15', title: 'Break' },
			{ time: '', title: 'Session II (75 minutes)' },
			{
				time: '10:15 -- 10:45',
				title: 'Lightning Talks II',
				items: [
					{
						title: 'The Illustrated AlphaFold',
						url: 'https://elanapearl.github.io/blog/2024/the-illustrated-alphafold/',
						authors: 'Elana P Simon, Jake Silberg'
					},
					{
						title: 'A Visual Tour to Empirical Neural Network Robustness',
						url: 'https://cchen-vis.github.io/Narrative-Viz-for-Neural-Network-Robustness/',
						authors: 'Chen Chen, Jinbin Huang, Ethan M Remsberg, Zhicheng Liu'
					},
					{
						title: "Panda or Gibbon? A Beginner's Introduction to Adversarial Attacks",
						url: 'https://visxai-aml.vercel.app/',
						authors: 'Yuzhe You, Jian Zhao'
					},
					{
						title: 'What Can a Node Learn from Its Neighbors in Graph Neural Networks?',
						url: 'https://visual-intelligence-umn.github.io/GNN-101/',
						authors: 'Yilin Lu, Chongwei Chen, Matthew Xu, Qianwen Wang'
					},
					{
						title: 'ExplainPrompt: Decoding the language of AI prompts',
						url: 'https://www.explainprompt.com',
						authors: 'Shawn Simister'
					},
					{
						title:
							'Inside an interpretable-by-design machine learning model: enabling RNA splicing rational design',
						url: 'https://visualizing-interpretable-model.vercel.app',
						authors:
							'Mateus Silva Aragao, Shiwen Zhu, Nhi Nguyen, Alejandro Garcia, Susan Elizabeth Liao'
					}
				]
			},
			{
				time: '10:45 -- 11:30',
				title:
					'Closing Keynote: Adam Pearce - <a href="https://twitter.com/adamrpearce" target="_blank">@adamrpearce</a>',
				content:
					"Why Aren't We Using Visualizations to Interact with AI? - Well-crafted visualizations are the highest bandwidth way of downloading information into our brains. As complex machine learning models become increasingly useful and important, can we move beyond mostly using text to understand and engage with them?"
			},
			{ time: '11:30am', title: 'Closing' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks. In addition we also accept position papers in a more traditional form.',

		organizers: [
			{ name: 'Alex Bäuerle', affiliation: 'Axiom Bio' },
			{ name: 'Angie Boggust', affiliation: 'Massachusetts Institute of Technology' },
			{ name: 'Fred Hohman', affiliation: 'Apple' }
		],
		steeringCommittee: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'ETH AI Center' }
		],
		pc: [
			'Jane Adams',
			'Camelia D. Brumar',
			'Jaegul Choo',
			'Brandon Duderstadt',
			'Angus Forbes',
			'Seongmin Lee',
			'Katelyn Morrison',
			'Rita Sevastjanova',
			'Venkatesh Sivaraman',
			'James Wexler',
			'Catherine Yeh',
			'Tim Barz-Cech',
			'Yuexi Chen',
			'Aeri Cho',
			'Bhavana Doppalapudi',
			'Jianben He',
			'Sichen Jin',
			'Panfeng Li',
			'Tong Li',
			'Huyen N. Nguyen',
			'Haowei Ni',
			'Yu Qin',
			'Rubab Zahra Sarfraz',
			'Johanna Schmidt',
			'Ryan Yen'
		]
	},
	2023: {
		year: 2023,
		title: '6th Workshop on Visualization for AI Explainability',
		location: 'Online (+ meetup at IEEE VIS 2023 in Melbourne, Australia)',
		date: 'October 18th, 2023 at 8:00am PT / 3:00pm UTC',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: 'What Have Language Models Learned?',
				url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
				authors: 'Adam Pearce',
				year: 2021
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'K-Means Clustering: An Explorable Explainer',
				url: 'https://k-means-explorable.vercel.app/',
				authors: 'Yi Zhe Ang',
				year: 2022
			},
			{
				title: 'Comparing DNNs with UMAP Tour',
				url: 'https://tiga1231.github.io/umap-tour/',
				authors: 'Li and Scheidegger',
				year: 2020
			},
			{
				title: 'The Myth of the Impartial Machine',
				url: 'https://parametric.press/issue-01/the-myth-of-the-impartial-machine/',
				authors: 'Feng and Wu',
				year: 2019
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			},
			{
				title: "The Beginner's Guide to Dimensionality Reduction",
				url: 'https://idyll.pub/post/visxai-dimensionality-reduction-1dbad0a67a092b007c526a45/',
				authors: 'Conlen and Hohman',
				year: 2018
			}
		],
		dates: [
			{ date: 'July 30, 2023, anywhere', event: 'Submission Deadline' },
			{ date: 'September 10, 2023', event: 'Author Notification' },
			{ date: 'October 1, 2023', event: 'Camera Ready Deadline' },
			{ date: 'October 18th, 2023 at 8:00am PT / 3:00pm UTC', event: 'Workshop Online' }
		],
		program: [
			{ time: '8:00', title: 'Welcome from the Organizers' },
			{
				time: '8:00 -- 8:30',
				title: 'Session I',
				items: [
					{
						title: 'Conformal Prediction: A Visual Introduction',
						url: 'https://conformal-prediction.streamlit.app/',
						authors: 'Mihir Agarwal, Lalit Chandra Routhu, Zeel B Patel, Nipun Batra'
					},
					{
						title: 'Understanding and Comparing Multi-Modal Models',
						url: 'https://jku-vds-lab.github.io/amumo',
						authors: 'Christina Humer, Vidya Prasad, Marc Streit, Hendrik Strobelt'
					},
					{
						title: 'Neighborhood traces: When your neighborhood changes one layer at a time',
						url: 'https://www.moritzdueck.com/neighborhood-traces/',
						authors: 'Moritz Dück, Johannes Knittel, Hendrik Strobelt, Mennatallah El-Assady'
					},
					{
						title:
							'Of Deadly Skullcaps and Amethyst Deceivers: Reflections on a Transdisciplinary Study on XAI and Trust',
						url: 'http://jku-vds-lab.at/hoxai-at-visxai/',
						authors:
							'Andreas Hinterreiter, Christina Humer, Benedikt Leichtmann, Martina Mara, Marc Streit'
					},
					{
						title: 'VisForPINNs: Visualization for Understanding Physics Informed Neural Networks',
						url: 'https://observablehq.com/@visforpinns/visualization-for-understanding-pinns',
						authors:
							'Viny Saajan Victor, Manuel Ettmüller, Andre Schmeißer, Heike Leitte, Simone Gramsch'
					}
				]
			},
			{ time: '8:30 -- 8:45', title: 'Break' },
			{
				time: '8:45 -- 9:15',
				title: 'Session II',
				items: [
					{
						title: 'Do Machine Learning Models Memorize or Generalize?',
						url: 'https://pair.withgoogle.com/explorables/grokking/',
						authors:
							'Adam Pearce, Asma Ghandeharioun, Nada Hussein, Nithum Thain, Martin Wattenberg, Lucas Dixon'
					},
					{
						title: 'Diffusion Explainer: Visual Explanation for Text-to-image Stable Diffusion',
						url: 'https://poloclub.github.io/diffusion-explainer/',
						authors:
							'Seongmin Lee, Benjamin Hoover, Hendrik Strobelt, Zijie J. Wang, ShengYun Peng, Austin P Wright, Kevin Li, Haoyang Yang. Haekyu Park, Duen Horng Chau'
					},
					{
						title: "Learning What's in a Name with Graphical Models",
						url: 'https://graphical-models.netlify.app',
						authors: 'Vu Luong, Justin S Selig'
					},
					{
						title: 'Neural Networks: A Visual Introduction',
						url: 'https://mlu-explain.github.io/neural-networks/',
						authors: 'Jared Wilber'
					},
					{
						title: "PAC Learning Or: Why We Should (and Shouldn't) Trust Machine Learning",
						url: 'https://www.cs.brandeis.edu/~dylan/pac_learning/',
						authors: 'Dylan Cashman'
					}
				]
			},
			{ time: '9:15 -- 9:30', title: 'Break' },
			{
				time: '9:30 -- 10:30',
				title: 'Keynote: Matthew Conlen - @mathisonian',
				content: 'Beyond Notebooks: Computational Tools for Disseminating Research and Ideas'
			},
			{ time: '10:30am', title: 'Closing' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks. In addition we also accept position papers in a more traditional form.',

		organizers: [
			{ name: 'Alex Bäuerle', affiliation: 'Independent Researcher' },
			{ name: 'Angie Boggust', affiliation: 'Massachusetts Institute of Technology' },
			{ name: 'Fred Hohman', affiliation: 'Apple' },
			{ name: 'Ian Johnson', affiliation: 'Latent Interfaces' },
			{ name: 'Zijie Jay Wang', affiliation: 'Georgia Tech' }
		],
		steeringCommittee: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'ETH AI Center' }
		],
		pc: [
			'Jane Adams',
			'Marco Angelini',
			'Donald Bertucci',
			'Ángel Cabrera',
			'Jaegul Choo',
			'Brandon Duderstadt',
			'Angus Forbes',
			'Iris Howley',
			'Andriy Mulyar',
			'Rita Sevastjanova',
			'Arjun Srinivasan',
			'Yang Wang',
			'James Wexler'
		]
	},
	2022: {
		year: 2022,
		title: '5th Workshop on Visualization for AI Explainability',
		location: 'Oklahoma City, Oklahoma',
		date: 'October 17th, 2022',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: 'What Have Language Models Learned?',
				url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
				authors: 'Adam Pearce',
				year: 2021
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'Comparing DNNs with UMAP Tour',
				url: 'https://tiga1231.github.io/umap-tour/',
				authors: 'Li and Scheidegger',
				year: 2020
			},
			{
				title: 'The Myth of the Impartial Machine',
				url: 'https://parametric.press/issue-01/the-myth-of-the-impartial-machine/',
				authors: 'Feng and Wu',
				year: 2019
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			}
		],
		dates: [
			{ date: 'July 29, 2022, anywhere', event: 'Explainables Submission' },
			{ date: 'August 29, 2022', event: 'Author Notification' },
			{ date: 'October 17th, 2022', event: 'Workshop in Oklahoma City at IEEE VIS 2022' }
		],
		program: [
			{ time: '2:00 -- 2:05', title: 'Welcome from the Organizers' },
			{
				time: '2:05 -- 2:55',
				title: 'Keynote: Ian Johnson (Observable) - @enjalot',
				content: 'Towards a Pattern Language for Visualizing AI'
			},
			{
				time: '2:55 -- 3:15',
				title: 'Session I',
				items: [
					{
						title: 'K-Means Clustering: An Explorable Explainer',
						url: 'https://k-means-explorable.vercel.app/',
						authors: 'Yi Zhe Ang'
					},
					{
						title: 'Action as Information',
						url: 'https://pbizopoulos.github.io/action-as-information/',
						authors: 'Paschalis Bizopoulos'
					}
				]
			},
			{ time: '3:15 -- 3:45', title: 'Break' },
			{
				time: '3:45 -- 4:15',
				title: 'Session II',
				items: [
					{
						title: 'How is Real-World Gender Bias Reflected in Language Models?',
						url: 'https://lm-bias.lingvis.io/',
						authors: 'Javier Rando, Alexander Theus, Rita Sevastjanova, Mennatallah El-Assady'
					},
					{
						title: 'Explaining Image Classifiers with Wavelets',
						url: 'https://julheg.github.io/waveletexplainability/',
						authors: 'Julius Hege'
					},
					{
						title: 'What should we watch tonight?',
						url: 'https://ibrahimalhazwani.github.io/distill-xai/',
						authors:
							'Ibrahim Al-Hazwani, Gabriela Morgenshtern, Yves Rutishauser, Mennatallah El-Assady, Jürgen Bernard'
					}
				]
			},
			{
				time: '4:15 -- 4:45',
				title: 'Session III',
				items: [
					{
						title: 'Poisoning Attacks and Subpopulation Susceptibility',
						url: 'https://uvasrg.github.io/poisoning/',
						authors: 'Evan Rose, Fnu Suya, David Evans'
					},
					{
						title: 'Mapping Wikipedia with BERT and UMAP',
						url: 'http://nomic.ai/visxwiki',
						authors: 'Brandon Duderstadt'
					},
					{
						title: 'An Interactive Introduction to Causal Inference',
						url: 'https://lbynum.github.io/interactive-causal-inference/',
						authors:
							'Lucius E.J. Bynum, Falaah Arif Khan, Oleksandra Konopatska, Joshua Loftus, Julia Stoyanovich'
					}
				]
			},
			{ time: '4:45 -- 5:00', title: 'Closing Session' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks. In addition we also accept position papers in a more traditional form.',

		organizers: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Angie Boggust', affiliation: 'Massachusetts Institute of Technology' },
			{ name: 'Fred Hohman', affiliation: 'Apple' },
			{ name: 'Ian Johnson', affiliation: 'Latent Interfaces' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'ETH AI Center' },
			{ name: 'Zijie Jay Wang', affiliation: 'Georgia Tech' }
		],
		steeringCommittee: [
			{ name: 'Duen Horng (Polo) Chau', affiliation: 'Georgia Tech' },
			{ name: 'Fernanda Viégas', affiliation: 'Google Brain' }
		],
		pc: [
			'Soumya Dutta',
			'Zhixuan Zhou',
			'Marco Angelini',
			'Jürgen Bernard',
			'Alex Bäuerle',
			'Jaegul Choo',
			'Angus Forbes',
			'Iris Howley',
			'Romain Vuillemot',
			'James Wexler',
			'Donald Bertucci',
			'Ángel Cabrera',
			'Victor Dibia',
			'Denis Parra',
			'Rita Sevastjanova',
			'Yang Wang'
		]
	},
	2021: {
		year: 2021,
		title: '4th Workshop on Visualization for AI Explainability',
		location: 'Virtual (originally New Orleans, Louisiana)',
		date: 'October 25th, 2021',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: "The Beginner's Guide to Dimensionality Reduction",
				url: 'https://idyll.pub/post/dimensionality-reduction-293e465c2a3443e8941b016d/',
				authors: 'Conlen and Hohman',
				year: 2018
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'Comparing DNNs with UMAP Tour',
				url: 'https://tiga1231.github.io/umap-tour/',
				authors: 'Li and Scheidegger',
				year: 2020
			},
			{
				title: 'The Myth of the Impartial Machine',
				url: 'https://parametric.press/issue-01/the-myth-of-the-impartial-machine/',
				authors: 'Feng and Wu',
				year: 2019
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			}
		],
		dates: [
			{ date: 'August 6, 2021, anywhere', event: 'Explainables Submission' },
			{ date: 'September 10, 2021', event: 'Author Notification' },
			{ date: 'October 25, 2021', event: 'Workshop online at IEEE VIS 2021' }
		],
		program: [
			{ time: '12:00 -- 12:05', title: 'Welcome from the Organizers' },
			{
				time: '12:05 -- 1:00',
				title: 'Keynote: David Ha (Google) - @hardmaru',
				content: 'Using the Webpage as the Main Medium for Communicating Research Ideas'
			},
			{
				time: '1:00 -- 1:30',
				title: 'Session I',
				items: [
					{
						title: 'What Have Language Models Learned?',
						url: 'https://pair.withgoogle.com/explorables/fill-in-the-blank/',
						authors: 'Adam Pearce'
					},
					{
						title:
							'Feature Sonification: An investigation on the features learned for Automatic Speech Recognition',
						url: 'http://www.cs.umd.edu/~amin/apps/visxai/sonification/',
						authors:
							'Amin Ghiasi, Hamid Kazemi, W. Ronny Huang, Emily Liu, Micah Goldblum, Tom Goldstein'
					},
					{
						title: 'Interactive Similarity Overlays',
						url: 'https://ruthcfong.github.io/projects/interactive_overlay/',
						authors: 'Ruth Fong, Alexander Mordvintsev, Andrea Vedaldi, Chris Olah'
					}
				]
			},
			{ time: '1:30 -- 2:00', title: 'Break' },
			{
				time: '2:00 -- 2:30',
				title: 'Session II',
				items: [
					{
						title: 'An Interactive Introduction to Model-Agnostic Meta-Learning',
						url: 'https://interactive-maml.github.io/',
						authors: 'Luis Müller, Max Ploner, Thomas Goerttler, Klaus Obermayer'
					},
					{
						title: 'Demystifying the Embedding Space of Language Models',
						url: 'https://bert-vs-gpt2.dbvis.de/',
						authors:
							'Rebecca Kehlbeck, Rita Sevastjanova, Thilo Spinner, Tobias Stähle, Mennatallah El-Assady'
					},
					{
						title: 'Backprop Explainer: An Explanation with Interactive Tools',
						url: 'https://xnought.github.io/backprop-explainer/',
						authors: 'Donald Bertucci, Minsuk Kahng'
					}
				]
			},
			{ time: '2:30 -- 2:35', title: 'Project Pitch Videos' },
			{
				time: '2:35 -- 3:05',
				title: 'Session III',
				items: [
					{
						title: '(Un)Fair Machine',
						url: 'https://unfair-machine.netlify.app/',
						authors: 'Vu Luong'
					},
					{
						title:
							"Amazon's MLU-Explain: Interactive Explanations of Core Machine Learning Concepts",
						url: 'https://mlu-explain.github.io/',
						authors: 'Jared Wilber, Jenny Yeon, Brent Werness'
					},
					{
						title: 'Exploring Hidden Markov Model',
						url: 'https://nipunbatra.github.io/hmm/',
						authors:
							'Rithwik Kukunuri, Rishiraj Adhikary, Mahika Jaguste, Nipun Batra, Ashish Tendulkar'
					}
				]
			},
			{ time: '3:05 -- 3:10', title: 'Closing Session' },
			{ time: '3:10 -- 5:00', title: 'VISxAI Eastcoast Party' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks. In addition we also accept position papers in a more traditional form.',

		organizers: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Fred Hohman', affiliation: 'Apple' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'ETH AI Center' }
		],
		steeringCommittee: [
			{ name: 'Duen Horng (Polo) Chau', affiliation: 'Georgia Tech' },
			{ name: 'Fernanda Viégas', affiliation: 'Google Brain' }
		],
		pc: [
			'Marco Angelini',
			'Jürgen Bernard',
			'Angie Boggust',
			'Nan Cao',
			'Marco Cavallo',
			'Jaegul Choo',
			'Tommy Dang',
			'Victor Dibia',
			'Angus Forbes',
			'Iris Howley',
			'Denis Parra',
			'Arjun Srinivasan',
			'Romain Vuillemot',
			'Yang Wang',
			'James Wexler'
		]
	},
	2020: {
		year: 2020,
		title: '3rd Workshop on Visualization for AI Explainability',
		location: 'Virtual (originally Salt Lake City, Utah)',
		date: 'October 26, 2020',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [
			{
				title: 'A Visual Exploration of Gaussian Processes',
				url: 'https://distill.pub/2019/visual-exploration-gaussian-processes/',
				authors: 'Görtler, Kehlbeck, and Deussen',
				year: 2018
			},
			{
				title: "The Beginner's Guide to Dimensionality Reduction",
				url: 'https://idyll.pub/post/dimensionality-reduction-293e465c2a3443e8941b016d/',
				authors: 'Conlen and Hohman',
				year: 2018
			},
			{
				title: 'What if we Reduce the Memory of an Artificial Doom Player?',
				url: 'https://theo-jaunet.github.io/MemoryReduction/',
				authors: 'Jaunet, Vuillemot, and Wolf',
				year: 2019
			},
			{
				title: 'Communicating Model Uncertainty Over Space',
				url: 'https://pair-code.github.io/interpretability/uncertainty-over-space/',
				authors: 'Pearce',
				year: 2020
			},
			{
				title: 'The Myth of the Impartial Machine',
				url: 'https://parametric.press/issue-01/the-myth-of-the-impartial-machine/',
				authors: 'Feng and Wu',
				year: 2019
			},
			{
				title: 'FormaFluens Data Experiment',
				url: 'http://formafluens.io/client/mix10.html',
				authors: 'Strobelt, Phibbs, and Martino',
				year: 2018
			}
		],
		dates: [
			{ date: 'August 24, 2020, anywhere', event: 'Explainables Submission' },
			{ date: 'Sepember 24, 2020', event: 'Author Notification' },
			{ date: 'October 13, 2020', event: 'Camera-ready Copy for Accepted Submissions' },
			{ date: 'October 26, 2020', event: 'Workshop online at IEEE VIS 2020' }
		],
		program: [
			{ time: '12:00 -- 12:05', title: 'Welcome from the Organizers' },
			{
				time: '12:05 -- 1:00',
				title: 'Keynote: Thomas Wolf (Huggingface Inc.)',
				content:
					'Facilitating Interactive Explanations with Open-source Libraries: An Introduction to Transfer Learning in NLP and HuggingFace'
			},
			{
				time: '1:00 -- 1:30',
				title: 'Session I',
				items: [
					{
						title: 'Comparing DNNs with UMAP Tour',
						url: 'https://tiga1231.github.io/umap-tour/',
						authors: 'Mingwei Li and Carlos Scheidegger'
					},
					{
						title: 'How Does a Computer "See" Gender?',
						url: 'https://www.pewresearch.org/interactives/how-does-a-computer-see-gender/',
						authors: 'Stefan Wojcik, Emma Remy, and Chris Baronavski'
					}
				]
			},
			{ time: '1:30 -- 2:00', title: 'Break' },
			{
				time: '2:00 -- 2:30',
				title: 'Session II',
				items: [
					{
						title: 'Théo Guesser',
						url: 'https://theo-jaunet.github.io/theo-guesser/',
						authors: 'Théo Jaunet, Romain Vuillemot, and Christian Wolf'
					},
					{
						title: 'Shared Interest: Human Annotations vs. AI Saliency',
						url: 'http://visxai-submission.xyz/article',
						authors: 'Angie Boggust, Benjamin Hoover, Arvind Satyanarayan, and Hendrik Strobelt'
					},
					{
						title:
							'A Visual Exploration of Fair Evaluation for ML - Bridging the Gap Between Research and the Real World',
						url: 'https://aarunku5.github.io/',
						authors: 'Anjana Arunkumar, Swaroop Mishra, and Chris Bryan'
					}
				]
			},
			{
				time: '2:30 -- 3:00',
				title: 'Session III',
				items: [
					{
						title:
							'Anomagram: An Interactive Visualization for Training and Evaluating Autoencoders on the task of Anomaly Detection',
						url: 'https://anomagram.fastforwardlabs.com/#/',
						authors: 'Victor Dibia'
					},
					{
						title: 'What Does BERT Dream Of?',
						url: 'https://pair-code.github.io/interpretability/text-dream/explainable/',
						authors: 'Alex Bäuerle and James Wexler'
					},
					{
						title: 'Active Learning: A Visual Tour',
						url: 'https://patel-zeel.github.io/active-learning-visualization/',
						authors: 'Zeel B Patel and Nipun Batra'
					}
				]
			},
			{ time: '3:00 -- 3:05', title: 'Closing Session' },
			{ time: '3:05 -- 4:00', title: 'VISxAI Eastcoast party' }
		],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks.',

		organizers: [
			{ name: 'Adam Perer', affiliation: 'Carnegie Mellon University' },
			{ name: 'Duen Horng (Polo) Chau', affiliation: 'Georgia Tech' },
			{ name: 'Fernanda Viégas', affiliation: 'Google Brain' },
			{ name: 'Fred Hohman', affiliation: 'Georgia Tech' },
			{ name: 'Hendrik Strobelt', affiliation: 'MIT-IBM Watson AI Lab' },
			{ name: 'Mennatallah El-Assady', affiliation: 'University of Konstanz' }
		],
		steeringCommittee: [],
		pc: [
			'Marco Angelini',
			'Jürgen Bernard',
			'Nan Cao',
			'Dylan Cashman',
			'Marco Cavallo',
			'Jaegul Choo',
			'Tommy Dang',
			'Angus Forbes',
			'Sebastian Gehrmann',
			'Fred Hohman',
			'Iris Howley',
			'Denis Parra',
			'Arjun Srinivasan',
			'Yang Wang'
		]
	},
	2019: {
		year: 2019,
		title: '2nd Workshop on Visualization for AI Explainability',
		location: 'Vancouver, Canada',
		date: 'October 21, 2019',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [],
		dates: [],
		program: [],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks.',

		organizers: [],
		steeringCommittee: [],
		pc: []
	},
	2018: {
		year: 2018,
		title: '1st Workshop on Visualization for AI Explainability',
		location: 'Berlin, Germany',
		date: 'October 22, 2018',
		intro: [
			'The role of visualization in artificial intelligence (AI) gained significant attention in recent years. With the growing complexity of AI models, the critical need for understanding their inner-workings has increased. Visualization is potentially a powerful technique to fill such a critical need.',
			"The goal of this workshop is to initiate a call for 'explainables' / 'explorables' that explain how AI techniques work using visualization. We believe the VIS community can leverage their expertise in creating visual narratives to bring new insight into the often obfuscated complexity of AI systems."
		],
		examples: [],
		dates: [],
		program: [],
		callForParticipation:
			'To make our work more accessible to the general audience, we are soliciting submissions in a novel format: blog-style posts and jupyter-like notebooks.',

		organizers: [],
		steeringCommittee: [],
		pc: []
	}
};

export const getYearData = (year: number): YearData | undefined => {
	return years[year];
};

export const latestYear = 2025;
