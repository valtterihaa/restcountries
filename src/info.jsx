import React from 'react'

function Info(){
    return (
        <div className="my-info">
            <p>In March of 2021, I was applying to Web Developer Intern positions. One company assigned me a task where I was to use React and the <a href="restcountries.eu">REST Countries API</a> to display certain information on a page. At the time, I was not able to finish the task even by watching tutorial videos and looking at example code by people who had done very similar things with the API (apparently a website called Front-end mentor had this kind of a task); the requirements were just a bit too different from what other people had done, and I was not very good with React back then. 
            </p><br></br>
            <p>Now, a bit over a month later I have become a lot more comfortable with React and am able to search for information and solutions to issues much more efficiently, so I came back to the assignment, and while the opportunity of internship at the company in question has passed, completing this task is obviously beneficial to me as someone who wants to be a Web Developer.</p><br></br>
            <p>Now, I am not going to name this company, but this is the list of requirements they had in the assignment.</p>
            <div className="my-info-list">
                <ol>
                    <li>Display all countries in a list. 
                        <ul>
                            <li>Flag</li>
                            <li>Name</li>
                            <li>Population</li>
                            <li>Region</li>
                        </ul>
                    </li>
                    <li>Additionally, user should be able
                        <ul>
                            <li>Filter countries by name</li>
                            <li>Filter countries by subregion</li>
                        </ul>
                        
                    </li>
                </ol>
            </div>
            
        </div>
    )
}

export default Info