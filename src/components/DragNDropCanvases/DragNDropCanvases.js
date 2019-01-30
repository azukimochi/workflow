import React from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
// };

// /**
//  * Moves an item from one list to another list.
//  */
// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destClone.splice(droppableDestination.index, 0, removed);

//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;
//     return result;
// };

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

const DragNDropCanvasses = props => {
return(
    <div className="container">
    <DragDropContext onDragEnd={props.onDragEnd}>
    <Droppable droppableId="droppable" direction="horizontal">
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                >
                {props.availableActions.map((item, index) => (
                    <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.action}
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
    <br />
    <Droppable droppableId="droppable2" direction="horizontal">
        {(provided, snapshot) => (
            <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
                >
                {props.selectedActions.map((item, index) => 
                    // return item.nextStage !== null || item.prevStage !== null ? 
                    (<Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}>
                        {(provided, snapshot) => (
                            <div className="horizontal"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}>
                                {item.action}
                            </div>
                        )}
                    </Draggable>
                    ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
</DragDropContext>
</div>
)
}

export default DragNDropCanvasses