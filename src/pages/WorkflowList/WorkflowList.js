import React, { Component } from "react"
import Workflow from "../../components/Workflow/Workflow.json"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const workFlowStages = Workflow.Stages
// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    console.log(result);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    console.log(result);
    return result;
};

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

// const getListStyle = isDraggingOver => ({
//     background: isDraggingOver ? 'lightblue' : 'lightgrey',
//     padding: grid,
//     width: 250
// });

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

class WorkflowList extends Component {
    state = {
        // items: getItems(10),
        // selected: getItems(5, 10)
        // availableActions: workFlowStages.filter(stage => !stage.prevStage && !stage.nextStage), 
        // selectedActions: workFlowStages.filter(stage => stage.prevStage || stage.nextStage)
    };

    componentDidMount = () => {
        console.log("mounted")
        let savedData = JSON.parse(localStorage.getItem("savedWorkFlow"))
        if (savedData) {
            this.setState({
                availableActions: savedData.availableActions,
                selectedActions: savedData.selectedActions
            }, () => console.log(this.state))
        } else {
            this.setState({
                availableActions: workFlowStages.filter(stage => !stage.prevStage && !stage.nextStage), 
                selectedActions: workFlowStages.filter(stage => stage.prevStage || stage.nextStage)
            },  () => console.log(this.state))
        }
    }
    /**
     * A semi-generic way to handle multiple lists. Matches
     * the IDs of the droppable container to the names of the
     * source arrays stored in the state.
     */
    id2List = {
        droppable: 'availableActions',
        droppable2: 'selectedActions'
    };

    // id2List = {
    //     availableActions: 'availableActions',
    //     selectedActions: 'selectedActions'
    // };


    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = { items };

            if (source.droppableId === 'selectedActions') {
                state = { selectedActions: items };
            }

            this.setState(state);
        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                availableActions: result.droppable,
                selectedActions: result.droppable2
            }, () => console.log(this.state));
        }
    };

    handleSave = event => {
        console.log("save button was clicked")
        let dataStr = JSON.stringify(this.state)
        console.log(dataStr)
        localStorage.setItem("savedWorkFlow", dataStr)

    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        if (this.state.availableActions && this.state.selectedActions) {
        return (
            <div className="container">
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable" direction="horizontal">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            >
                            {this.state.availableActions.map((item, index) => (
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
                            {this.state.selectedActions.map((item, index) => 
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

            <div>
                <button onClick={this.handleSave}>Save</button>
                </div>
    </div>
        )
    } else {
        return null
    }
    }
}

export default WorkflowList