import React,{PropsWithChildren} from 'react';
import HomeHeader from "./components/HomeHeader";
import {RouteComponentProps} from 'react-router-dom'
import {connect} from "react-redux";
import {CombinedState, HomeState} from "@/types/state";
import mapDispatchToProps from '@/store/actions/home'
type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> &typeof mapDispatchToProps>;

function Home(props:Props) {
  return (
    <div>
        <HomeHeader
            currentCategory={props.currentCategory}
            setCurrentCategory={props.setCurrentCategory}
        />
    </div>
  )
}

const mapStateToProps = (state:CombinedState):HomeState => state.home

export default connect(mapStateToProps,mapDispatchToProps)(Home)