import React from 'react'

function Info(){
    return (<section>
        <div className="my-info">
            <p>This application uses the <a href="https://restcountries.com" target="_blank" rel="noreferrer">restcountries.com</a> API.</p>
            <p><b>Notice:</b> As of September 2021, restcountries has rolled out a new version of their API. This application uses the older version until I can get all the necessary features (along with some new ones) working with the new API.</p>
            <p>In March of 2021, I was enrolled in a full stack web development course, and applying for web developer intern positions. One of the companies I applied to wanted me to complete a test where I was to build an app with React, using the aforementioned API. Alas, back then I was not skilled enough to complete the assignment, even though I found instructional videos by people who had done a <a href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca" target="_blank" rel="noreferrer">challenge</a> using the same API by Frontend Mentor – the requested features were just different enough where I could not grasp how to solve certain issues I faced. I ended up sending the company an e-mail to let them know I was not able to complete the task.</p>
            <p>In a matter of months, though, still during the training period of the course, I was able to build the application with all the requested features, and then some, after having learned to use React a whole lot better.</p>
            <p>This was not the end of the story, however. You see, in the course for which the internship was a part of, we learned to use React with class components. During my internship, which I did at a different company, I learned that React developers are in the process of overhauling the entire React documentation in favor of functional components. So, after the internship was over, I re-wrote the code in functional components. This is the final result of my hard work and dedication. Even though this app is rather simple in the grand scheme of things in the web developer world, it has definitely been useful, not only in learning web development and especially developing web applications with React, but in learning the flags of countries – a skill that is very useful when playing <a href="https://www.geoguessr.com" target="_blank" rel="noreferrer">Geoguessr</a>!</p>
        </div>
    </section>)
}

export default Info