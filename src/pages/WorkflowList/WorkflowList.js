import React, { Component } from "react"
import Workflow from "../../components/Workflow/Workflow.json"
import CancelModal from "../../components/CancelModal/CancelModal"
import DragNDropCanvasses from "../../components/DragNDropCanvases/DragNDropCanvases"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const workFlowStages = Workflow.Stages

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source)
    const destClone = Array.from(destination)
    const [removed] = sourceClone.splice(droppableSource.index, 1)

    destClone.splice(droppableDestination.index, 0, removed)

    const result = {}
    result[droppableSource.droppableId] = sourceClone
    result[droppableDestination.droppableId] = destClone
    return result
}

class WorkflowList extends Component {
    state = {
        modalIsOpen: false
    }
    
    id2List = {
        droppable: 'availableActions',
        droppable2: 'selectedActions'
    }

    componentDidMount = () => {
        this.getSavedData()
    }
    
    getSavedData = () => {
        let savedData = JSON.parse(localStorage.getItem("savedWorkFlow"))
        if (savedData) {
            this.setState({
                availableActions: savedData.availableActions,
                selectedActions: savedData.selectedActions
            })
        } else {
            this.setState({
                availableActions: workFlowStages.filter(stage => !stage.prevStage && !stage.nextStage), 
                selectedActions: workFlowStages.filter(stage => stage.prevStage || stage.nextStage)
            })
        }
    }
  
    getList = id => this.state[this.id2List[id]];

    onDragEnd = result => {
        const { source, destination } = result;

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
            });
        }
    };

    handleSave = event => {
        let dataStr = JSON.stringify(this.state)
        localStorage.setItem("savedWorkFlow", dataStr)
        toast.success("Saving...")
    }

    handleDiscard = event => {
        this.getSavedData()
        this.closeModal()
    }

    goToAdminPage = event => {
        event.preventDefault()
        this.props.history.push("/")
    }

    openModal = () => {
        this.setState({modalIsOpen: true},
        () => console.log("modal is open"));
      }
     
      afterOpenModal = () => {
        this.subtitle.style.color = '#f00';
      }
     
      closeModal = () => {
        this.setState({modalIsOpen: false});
      }

    render() {
        if (this.state.availableActions && this.state.selectedActions) {
        return (
            <div className="container">

            <DragNDropCanvasses
            onDragEnd={this.onDragEnd}
            availableActions={this.state.availableActions}
            selectedActions={this.state.selectedActions}
            />

            <div>
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.openModal}>Cancel</button>
                <button onClick={this.goToAdminPage}>Go to the Admin Page</button>
                </div>

            <div>
            <CancelModal
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
            handleDiscard={this.handleDiscard}
          />

          <ToastContainer 
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          />
            </div>
    </div>
        )
    } else {
        return null
    }
    }
}

export default WorkflowList