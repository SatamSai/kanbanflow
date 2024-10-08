import { Board } from "../types";


export const boards: Board[] = [
    {
        _id: "board1",
        title: "Project Alpha",
        description: "This board is for tracking the development of Project Alpha.",
        columns: [
            { id: "column1", title: "To Do" },
            { id: "column2", title: "In Progress" },
            { id: "column3", title: "Completed" }
        ],
        tasks: [
            {
                id: "task1",
                title: "Setup Environment",
                description: "Prepare the development environment",
                subTasks: [
                    {
                        id: "subtask1",
                        title: "Install Dependencies",
                        description: "Install necessary packages",
                        subTasks: [],
                        status: { id: "column1", title: "To Do" }
                    },
                    {
                        id: "subtask2",
                        title: "Configure IDE",
                        description: "Set up the IDE for development",
                        subTasks: [],
                        status: { id: "column1", title: "To Do" }
                    }
                ],
                status: { id: "column1", title: "To Do" }
            },
            {
                id: "task2",
                title: "Develop Authentication Module",
                description: "Create the user authentication module",
                subTasks: [
                    {
                        id: "subtask3",
                        title: "Design Login Page",
                        description: "Create the UI for the login page",
                        subTasks: [],
                        status: { id: "column2", title: "In Progress" }
                    }
                ],
                status: { id: "column2", title: "In Progress" }
            },
            {
                id: "task3",
                title: "Setup CI/CD Pipeline",
                description: "Automate the build and deployment process",
                subTasks: [],
                status: { id: "column1", title: "To Do" }
            }
        ]
    },
    {
        _id: "board2",
        title: "Marketing Campaign",
        description: "This board is for managing the marketing campaign.",
        columns: [
            { id: "column4", title: "Ideas" },
            { id: "column5", title: "Design" },
            { id: "column6", title: "Launch" },
            { id: "column7", title: "Review" }
        ],
        tasks: [
            {
                id: "task4",
                title: "Brainstorm Campaign Ideas",
                description: "Come up with new campaign ideas",
                subTasks: [
                    {
                        id: "subtask4",
                        title: "Gather Market Research",
                        description: "Research current market trends",
                        subTasks: [],
                        status: { id: "column4", title: "Ideas" }
                    }
                ],
                status: { id: "column4", title: "Ideas" }
            },
            {
                id: "task5",
                title: "Design Campaign Graphics",
                description: "Create visuals for the campaign",
                subTasks: [
                    {
                        id: "subtask5",
                        title: "Create Logo",
                        description: "Design a logo for the campaign",
                        subTasks: [],
                        status: { id: "column5", title: "Design" }
                    },
                    {
                        id: "subtask6",
                        title: "Design Banners",
                        description: "Create banner ads",
                        subTasks: [],
                        status: { id: "column5", title: "Design" }
                    }
                ],
                status: { id: "column5", title: "Design" }
            }
        ]
    },
    {
        _id: "board3",
        title: "Product Launch",
        description: "This board tracks the tasks for the product launch.",
        columns: [
            { id: "column8", title: "Planning" },
            { id: "column9", title: "Execution" },
            { id: "column10", title: "Follow-up" }
        ],
        tasks: [
            {
                id: "task6",
                title: "Finalize Product Features",
                description: "Decide on the final feature set",
                subTasks: [
                    {
                        id: "subtask7",
                        title: "Feature A Review",
                        description: "Review Feature A implementation",
                        subTasks: [],
                        status: { id: "column8", title: "Planning" }
                    },
                    {
                        id: "subtask8",
                        title: "Feature B Testing",
                        description: "Test Feature B",
                        subTasks: [
                            {
                                id: "subtask9",
                                title: "Write Test Cases",
                                description: "Write test cases for Feature B",
                                subTasks: [],
                                status: { id: "column8", title: "Planning" }
                            }
                        ],
                        status: { id: "column8", title: "Planning" }
                    }
                ],
                status: { id: "column8", title: "Planning" }
            },
            {
                id: "task7",
                title: "Launch Product",
                description: "Initiate product launch sequence",
                subTasks: [
                    {
                        id: "subtask10",
                        title: "Set Launch Date",
                        description: "Decide on the launch date",
                        subTasks: [],
                        status: { id: "column9", title: "Execution" }
                    }
                ],
                status: { id: "column9", title: "Execution" }
            }
        ]
    },
    {
        _id: "board4",
        title: "Website Redesign",
        description: "This board is for the website redesign project.",
        columns: ["Research", "Development", "Testing", "Deployment"],
        tasks: [
            {
                id: "task8",
                title: "Analyze Competitor Websites",
                description: "Study competitor websites for ideas",
                subTasks: [
                    {
                        id: "subtask11",
                        title: "Collect Feedback",
                        description: "Gather feedback from users",
                        subTasks: [],
                        status: "Research"
                    }
                ],
                status: { id: "column11", title: "Research" }
            },
            {
                id: "task9",
                title: "Design New Homepage",
                description: "Create a new homepage design",
                subTasks: [
                    {
                        id: "subtask12",
                        title: "Create Wireframe",
                        description: "Draft the homepage wireframe",
                        subTasks: [],
                        status: { id: "column12", title: "Development" }
                    },
                    {
                        id: "subtask13",
                        title: "Design Mockup",
                        description: "Create a high-fidelity mockup",
                        subTasks: [],
                        status: { id: "column12", title: "Development" }
                    }
                ],
                status: { id: "column12", title: "Development" }
            },
            {
                id: "task10",
                title: "Test Website Performance",
                description: "Run performance tests on the website",
                subTasks: [],
                status: { id: "column13", title: "Testing" }
            }
        ]
    }
];
