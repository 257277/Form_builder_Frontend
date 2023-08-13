import style from "./submitForm.module.css"
import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

export default function SubmitForm() {
    const [data, setdata] = useState({});
    const [noOfBlank, setnoOfBlank] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [answer2,setanswer2]=useState("");
    const [email,setemail]=useState("");
    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetch("https://tan-good-badger.cyclic.app/getform");
                let jsonData = await res.json();
                setdata(jsonData[0]);
                const blanksArray = jsonData[0].question2?.question?.split("_________________");
                const numberOfBlanks = blanksArray ? blanksArray.length - 1 : 0;
                setnoOfBlank(numberOfBlanks);
                setColumns(Question1ResponseArray(jsonData[0]));
         
            } catch (error) {
                console.error("Error occurred:", error.message);
            }
        }

        fetchData();


    }, []);
    const [columns, setColumns] = useState({});
    // const [answer,setanswer]=useState(data.question1?.answers)
    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedOptions((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [questionId]: selectedOption,
        }));
    };

    function Question1ResponseArray(data) {
        let arr = {
            answers: {
                title: "Answers",
                items: data.question1?.answers?.map((item, index) => ({
                    id: `answer${index}`, // Corrected to match draggableId format
                    answer: item.answer
                }))
            }
        };
    
        data.question1?.category?.forEach((item, index) => {
            arr[`container${index}`] = {
                title: item.name,
                items: []
            };
        });
    
        return arr;
    }
    

    const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems,
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems,
            },
          });
        } 
        else {
          const column = columns[source.droppableId];
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems,
            },
           
          }
          );
        }
        
      };
 async function submit()
  {console.log({columns,answer2,selectedOptions})
    try{
        const response = await fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjUwNTZjMDYzMTA0M2M1MjY1NTUzNTUxMzIi_pc', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"answer1":columns,"answer2":answer2,"answer3":selectedOptions,email}),
          });
    
          if (response.ok) {
            alert("Respose recorded sucessfully!")
          } else {
            alert("Please try after some time")
          }
    }
    catch(err)
    {
        alert(err);
    }
  }



    return (

        <div id={style.container}>
            <h1 className={style.heading}>Latest form</h1>

            <div>
                <h1>Question1</h1>
                <h3>Question: {data.question1?.question}</h3>
                <p>Note: Drag the answers from Answer column to respective columns</p>
                <DragDropContext onDragEnd={(result) => {
                    onDragEnd(result, columns, setColumns)}}>
    <div className={style.AllContainers}>
        {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className={style.categorybox}>
                <h1>{column.title}</h1>
                <Droppable droppableId={columnId} key={columnId}>
                    {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className={style.categorybox}>
                            {column.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.dragHandleProps}
                                            {...provided.draggableProps}
                                            className={style.answers}
                                        >
                                            {item.answer}
                                        </div>
                                    )}
                                          </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        ))}
    </div>
</DragDropContext>



            </div>

            <hr></hr>
            <div>

                <h1>Question2</h1>
                <h3>Question: {data.question2?.question}</h3>
                <h4>Enter answer in following inputs</h4>
                <p>Note: If you have more than one answer please enter all answers with a space</p>
                {[...Array(noOfBlank)].map((_, i) => (
                    <input
                        key={`fans${i}`}
                        type="text"
                        placeholder="Enter the answer of blanks"
                        id={`fans${i}`}
                        className={style.Question2Input}
                        onChange={(e)=>
                        {
                            setanswer2(e.target.value);
                        }}
                    />
                ))}
            </div>
            <hr></hr>
            <div>
                <h1>Question 3</h1>
                <h3>Paragraph: {data.question3?.paragraph}</h3>
                <h4>Answer the following MCQ questions</h4>
                {data.question3?.MCQ?.map((item, i) => (
                    <div key={i}>
                        <h4>{i + 1}. {item.question}</h4>
                        <div>
                            {item.options.map((option, index) => (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name={`question${i}`} // Use a unique name for each question to group radio buttons
                                        value={option}
                                        checked={selectedOptions[`question${i}`] === option} // Check if the option is selected
                                        onChange={() => handleOptionChange(`question${i}`, option)}
                                    />
                                    {option}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <hr></hr>
            <h1>Enter your Email address</h1>
            <input  className={style.Question2Input} type="email" placeholder="Enter Email Address" onChange={(e)=>
            {
                setemail(e.target.value);
            }}></input><br></br>
            <button onClick={submit}>Submit form</button>
        </div>
    );

}