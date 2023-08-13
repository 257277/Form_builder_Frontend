import style from "./createForm.module.css"
import { useState,useEffect } from "react";


export default function CreateForm()
{

    /*------------------------------question 1------------------------------------------  */
    const [fq,setfq]=useState("");
    let [categorycount,setcategorycount]=useState(2);
    let [answercount,setanswercount]=useState(0);
    let [answer,setanswer]=useState([])
    let [cat,setcat]=useState([{"id":"cat1","name":""},{"id":"cat2","name":""}])
    let [arr, setArr] = useState([]);
     let question1={"question":fq,"category":cat,"answers":answer};
   function AddQuestionCategory()
   {
    setcategorycount(++categorycount);
   let input=document.createElement("input");
   input.placeholder=`Type Category ${categorycount}`;
   input.className=style.firstCategory
   input.id=`cat${categorycount}`
   let br=document.createElement("br");
   input.addEventListener("change",(e)=>
   {
    const { value, id } = e.target;
    setcat((prevCat) =>
      prevCat.map((item) =>
        item.id === id ? { ...item, name: value } : item
      )
    );
   })
   document.getElementById("category").append(input,br);
   setcat((prevCat) => [
    ...prevCat,{"id":`cat${categorycount}`,"name":"","PlacedAnswer":[]}
  ]);
   }

   useEffect(() => {
    const options = cat.map((item) => (
      <option key={item.id} value={item.name}>
        {item.name}
      </option>
    ));
    setArr(options);
  }, [cat]);

   
     function genrateTable() {
   
        let ansText = document.getElementById(style.ans1).value;
    let option = document.getElementById(style.anscat).value;
    setanswercount(answercount + 1);
   

    setanswer((prevCat) => [
      ...prevCat,
      { id: answercount, answer: ansText, Category: option },
    ]);
      }
       /*--------------------------------question 2-------------------------------------------*/
       let [question,setquestion]=useState("");
       const [keyword,setkeyword]=useState("");
       const [buttonClickCount, setButtonClickCount] = useState(0);
       const [allkeyword,setallkeyword]=useState([]);
       let question2={"question":question,"answer":allkeyword};
       useEffect(()=>
       {
         setallkeyword((prev)=>
         [
            ...prev,keyword,
         ])
       },[buttonClickCount])
       function createfill()
       {
        
        let questionkeyword=question.split(" ");
       questionkeyword.map((item,i)=>
        {
            if(item===keyword)
            {
                questionkeyword[i]="_________________";
            }
        })
        let finalquestion=questionkeyword.join(" ");
        setquestion(finalquestion);
        setButtonClickCount((prevCount) => prevCount + 1);
       }
   /*--------------------------------question 3-------------------------------------------*/

       const [thirdq,setthirdq]=useState("");
       const [mcqq,setmcqq]=useState("");
       const [firstOption,setfirstOption]=useState("");
       const [secondOption,setsecondOption]=useState("");
       const [thirdOption,setthirdOption]=useState("");
       const [forthOption,setforthOption]=useState("");
       const [mcqAnswer,setmcqAnswer]=useState("");
       const [qthirdclicked,setqthirdclicked]=useState(0);
       const [allmcq,setallmcq]=useState([]);
       const [thirdfinal,setthirdfinal]=useState("")

       let question3={"paragraph":thirdq,"MCQ":allmcq};
       function createthirdquestion()
       {
        setqthirdclicked((prev)=>prev+1)
        let obj={"id":qthirdclicked,"question":mcqq,"options":[firstOption,secondOption,thirdOption,forthOption],"answer":mcqAnswer};
        setallmcq((prev)=>
        [
           ...prev,obj,
        ])
       }
       useEffect(() => {
        let arr = allmcq.map((item) => (
          <div key={item.id}>
            <h4>{item.id + 1}. {item.question}</h4>
            <ol className={style.Question3table}>
              <li>{item.options[0]}</li>
              <li>{item.options[1]}</li>
              <li>{item.options[2]}</li>
              <li>{item.options[3]}</li>
            </ol>
            <p>Answer: {item.answer}</p>
          </div>
        ));
        setthirdfinal(arr);
      }, [allmcq]);
   let allquestions={question1,question2,question3};
  async function createnewform() {
    try {
      // const requestData = {
      //   question1: allquestions.question1,
      //   question2: allquestions.question2,
      //   question3: question3
      // };
      let url = "https://tan-good-badger.cyclic.app/createform";
      let res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allquestions),
      });

      if (res.ok) {
        let r = await res.json();
        alert(r.message);
      } else {
        alert("Error occurred");
      }
    } catch (err) {
      alert("Error occurred:", err);
    }
  }


    return (

        <div className={style.container}>
          <h1 id={style.mainheading}>Create Form</h1>
         <h1 className={style.questionHeading}>Question 1</h1>
         <input type="text" placeholder="Enter Question Text" onChange={(e)=>
        {
            setfq(e.target.value);
        }} id={style.FirstQuestionInput}></input><br></br>
         <div id="category">
          <h2>Enter category and create them</h2>
         <input type="text" placeholder="Type Category 1" id="cat1" onChange={(e) => {
                const { value, id } = e.target;
                setcat((prevCat) =>
                  prevCat.map((item) =>
                    item.id === id ? { ...item, name: value } : item
                  )
                );
              }} className={style.firstCategory}></input><br></br>
         <input type="text" placeholder="Type Category 2" id="cat2" onChange={(e) => {
                const { value, id } = e.target;
                setcat((prevCat) =>
                  prevCat.map((item) =>
                    item.id === id ? { ...item, name: value } : item
                  )
                );
              }} className={style.firstCategory}></input><br></br>
        
         </div>
         <button onClick={AddQuestionCategory} >Add Category</button>
        <div id="allAns">
            <h3>All Answers</h3>
            <table>
  <tr>
    <th>Answer</th>
    <th>Category</th>
  </tr>
    <tbody className={style.tablebody}>
    {answer.map((item) => (
              <tr key={item.id}>
                <td>{item.answer}</td>
                <td>{item.Category}</td>
              </tr>
            ))}
    </tbody>
</table>
        </div>
         <div>
            <h3>Create answer and choose respective category</h3>
            <div id="answer">
            <input type="text" id={style.ans1}></input> 
            <select name="opt"  id={style.anscat}>
         
          <option name="opt" >
            Choose Category of answer
          </option>
          {arr}
        </select>
        </div>
        <button onClick={genrateTable}>Add answer</button>
         </div>
         <hr></hr>
         <div id="question2">
            <h1>Question 2</h1>
            <input type="text"  placeholder="Enter the text of question" id={style.question2} onChange={(e)=>
            {
                setquestion(e.target.value);
            }}/>
            <h3>Enter the word on which you want to create blank</h3>
            <p>Note: Please write only one word at a time</p>
            <input type="text" id={style.keyword} onChange={(e)=>
            {
                setkeyword(e.target.value);
            }}></input>
            <div>
                <h3>Final question</h3>
                {question}
                <h3>Answer</h3>
                {allkeyword.join(" ")}
            </div>
            <button onClick={createfill}>Create blank</button>
         </div>
         <div>
        <hr/>
            <h1>Question 3</h1>
            <input type="text" placeholder="Enter paragraph" onChange={(e)=>
            {
                setthirdq(e.target.value);  
            }} className={style.question3input}/>
            <h3>Create MCQ</h3>
            <input type="text" placeholder="Enter MCQ question" onChange={(e)=>
            {
                setmcqq(e.target.value);
            }} className={style.question3input}/><br></br>
            <input type="text" placeholder="Enter First option" onChange={(e)=>
            {
                setfirstOption(e.target.value);
            }} className={style.question3input}></input><br></br>
             <input type="text" placeholder="Enter Second option" onChange={(e)=>
            {
                setsecondOption(e.target.value);
            }} className={style.question3input}></input><br></br>
             <input type="text" placeholder="Enter Third option" onChange={(e)=>
            {
                setthirdOption(e.target.value);
            }} className={style.question3input}></input><br></br>
             <input type="text" placeholder="Enter fourth option" onChange={(e)=>
            {
                setforthOption(e.target.value);
            }} className={style.question3input}></input><br></br>
             <input type="text" placeholder="Enter Answer of MCQ" onChange={(e)=>
            {
                setmcqAnswer(e.target.value);
            }} className={style.question3input}></input><br></br>
            <button onClick={createthirdquestion}>Create MCQ</button>
            <div>
                <h3>Final Question</h3>
                <h4>Paragraph</h4>
                <p>{thirdq}</p>
                <h4>MCQ's</h4>
                </div>
                {thirdfinal}
         </div>
         <button onClick={createnewform}>Create Form</button>
        </div>
    );

}