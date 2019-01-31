import React from "react"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import "./DragNDropCanvases.css"

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 2 ${grid}px 0`,

    background: isDragging ? 'coral' : 'grey',

    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'darkgrey' : 'orange',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
});

const DragNDropCanvasses = props => {
    return (
        <div className="container">
            <div id="canvases">
                <DragDropContext onDragEnd={props.onDragEnd}>
                    <h3>Available Actions</h3>
                    <Droppable droppableId="droppable" direction="horizontal">
                        {(provided, snapshot) => (
                            <div className="canvas"
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
                                            <div className="tiles"
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
                    <h3>Your Workflow</h3>
                    <Droppable droppableId="droppable2" direction="horizontal">
                        {(provided, snapshot) => (
                            <div className="canvas"
                                ref={provided.innerRef}
                                style={getListStyle(snapshot.isDraggingOver)}
                                {...provided.droppableProps}
                                >
                                {props.selectedActions.map((item, index) =>
                                    (<Draggable
                                        key={item.id}
                                        draggableId={item.id}
                                        index={index}>
                                        {(provided, snapshot) => (
                                            <div className="tiles"
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
        </div>
    )
}

export default DragNDropCanvasses