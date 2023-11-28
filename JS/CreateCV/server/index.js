const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const Personal = require("./models/personal")
const Skill = require("./models/skill")
const SocialMedia = require("./models/social-media")
const WorkExperience = require("./models/work-experience")
const Education = require("./models/education")
const connect = require("./connection");

connect();

app.use(cors());
app.use(express.json());

const apiRoutes = express.Router();

let person = {
    name: "Elif Tuba Korkmaz",
    title: "Biologist & Full Stack Developer",
    phone: "0 543 110 09 96",
    email: "etubasavli@gmail.com",
    adress: "Kadıkoy/Istanbul",
    dateofBirth: new Date("1996-11-16"),
    avatar: "kurucu.jpg",
    aboutMe: `<div>I would like to tell you a little about myself to help you get to know me better. After working as a biologist for 4 years, I decided to make a radical change in my career and continue as a software developer. Actually, this decision was made based on my strong interest in software and my belief that I could achieve greater success. I have utilized many qualities I gained from biologist in my journey to become a software developer, both during my work hours and in focusing on my goals. When a good opportunity presents itself, I have a strong conviction that I can contribute a lot to your organization and to myself in a very short time. I hope that we'll have the chance to work together and get to know each other better.</div>`
}

let skills = [
    {
        title: "C#",
        rate: 80
    },
    {
        title: "HTML",
        rate: 100
    },
    {
        title: "JS",
        rate: 60
    }
]

let socialMedias = [
    {
        title: "Linkedin",
        link: "https://www.linkedin.com/in/eliftubakorkmaz/",
        icon: "fa-brands fa-linkedin"
    },
    {
        title: "Github",
        link: "https://github.com/eliftubakorkmaz",
        icon: "fa-brands fa-github"
    }
]

let workExperiences = [
    {
        title: "Frontend Developer",
        subTitle: "NTG - Novu Technology Group",
        date: "2023/Present",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci repellat corrupti eius excepturi est repellendus. Maiores, reiciendis excepturi, enim provident molestiae quisquam atque recusandae, id et quod consequuntur pariatur magni"
    },
    {
        title: "Software Intern",
        subTitle: "On7 Software",
        date: "2023/2023",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci repellat corrupti eius excepturi est repellendus. Maiores, reiciendis excepturi, enim provident molestiae quisquam atque recusandae, id et quod consequuntur pariatur magni"
    },
    {
        title: "Clinical Research Field Coordinator",
        subTitle: "AC Analitiq",
        date: "2014/2016",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci repellat corrupti eius excepturi est repellendus. Maiores, reiciendis excepturi, enim provident molestiae quisquam atque recusandae, id et quod consequuntur pariatur magni"
    }
]

let educations = [
    {
        title: "Marmara UNIVERSITY",
        section: "Faculty of Arts and Sciences",
        date: "2014/2018",
        description: "Biology"
    },
    {
        title: "USKUDAR UNIVERSITY",
        section: "Master Degree",
        date: "2019/2021",
        description: "Forensic Genetics"
    }
]

app.get("/api/createDefaultValue", async (req,res)=> {
    let personalModel = await Personal.findOne();
    if(personalModel === null){
        personalModel = new Personal(person);
        personalModel._id = uuidv4();
        await personalModel.save();
    }

    for(let s of skills){
        let skill = await Skill.findOne({title: s.title});
        if(skill === null){
            skill = new Skill(s);
            skill._id = uuidv4();
            await skill.save();
        }
    }

    for(let s of socialMedias){
        let socialMedia = await SocialMedia.findOne({title: s.title});
        if(socialMedia === null){
            socialMedia = new SocialMedia(s);
            socialMedia._id = uuidv4();
            await socialMedia.save();
        }
    }

    for(let w of workExperiences){
        let workExperience = await WorkExperience.findOne({
            title: w.title,
            subTitle: w.subTitle, 
            date: w.date,
            description: w.description});
        if(workExperience === null){
            workExperience = new WorkExperience(w);
            workExperience._id = uuidv4();
            await workExperience.save();
        }
    }

    for(let e of educations){
        let education = await Education.findOne({title: e.title,section: e.section});
        if(education === null){
            education = new Education(e);
            education._id = uuidv4();
            await education.save();
        }
    }

    res.json({message: "Create default value is successful"});
});

app.get("", (req, res)=> {
    res.json({message: "Api çalışıyor"});
});

app.get("/api/get", async (req,res)=> {
    const myInformation = {
        person: await Personal.findOne(),
        skills: await Skill.find(),
        socialMedias: await SocialMedia.find(),
        workExperiences: await WorkExperience.find(),
        educations: await Education.find()
    }
    res.json(myInformation);
});

app.post("/api/set", async(req,res)=> {
    const body = req.body;
    //Person update
    person = await Personal.findOne();
    const newPerson = new Personal(body.person);
    newPerson._id = person._id;
    await Personal.findByIdAndUpdate(person._id, newPerson);

    skills = body.skills;

    const currentSkills = await Skill.find();
    for(let c of currentSkills){
        const result = skills.findIndex(p=> p._id === c.id);
        if(result === -1){
            await Skill.findByIdAndRemove(c._id);
        }
    }

    for(let s of skills){
        if(s._id === null){
            const skill = new Skill();
            skill._id = uuidv4();
            skill.title = s.title;
            skill.rate = s.rate;
            await skill.save();
        }else{
            const skill = new Skill();
            skill._id = s._id
            skill.title = s.title;
            skill.rate = s.rate;
            await Skill.findByIdAndUpdate(s._id, skill)
        }
    }


    socialMedias = body.socialMedias;
    workExperiences = body.workExperiences;
    educations = body.educations;

    res.json({message: "Update is successful"})
});

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log("Uygulama ayakta: " + port));