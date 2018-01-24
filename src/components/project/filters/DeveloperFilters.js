import {ROLES} from '../../../constants'
import {MyTasksFilter, DefaultTasksFilter} from '../../containersProject'


export const DeveloperFilters = ({user= {auth: null}}) =>
    (user.role === ROLES.DEVELOPER) ?
        <div>
            <div>
                <MyTasksFilter userID={user.id}/>
            </div>
            <div>
                <DefaultTasksFilter/>
            </div>
        </div> :
        null


