import React, { Dispatch, SetStateAction, useCallback, useState } from 'react'
import styles from './Filters.module.scss'
import { Modal, Checkbox } from '@material-ui/core'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { Filter } from '../../types/filter'

interface Props {
  isVisible: boolean
  closeModalFilter: () => void
  setFilter: Dispatch<SetStateAction<Filter>>
  clearSearch: () => void
}

const defaultValue = {
  players: 4,
  time: 60,
}

const Filters: React.FC<Props> = ({ isVisible, closeModalFilter, setFilter, clearSearch }) => {
  const [usePlayers, setUsePlayers] = useState(false)
  const [players, setPlayers] = useState(defaultValue['players'])
  const [time, setTime] = useState(defaultValue['time'])
  const [useTime, setUseTime] = useState(false)
  const [easy, setEasy] = useState(false)
  const [medium, setMedium] = useState(false)
  const [hard, setHard] = useState(false)
  const [classic, setClassic] = useState(false)
  const [party, setParty] = useState(false)
  const [strategy, setStrategy] = useState(false)

  const handlePlayerChange = useCallback((value: number) => {
    setPlayers(value)
  }, [])

  const handleTimeChange = useCallback((value: number) => {
    setTime(value)
  }, [])

  const handlePlayerCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsePlayers(event.target.checked)
  }

  const handleTimeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseTime(event.target.checked)
  }

  const cleanFilter = () => {
    setUsePlayers(false)
    setUseTime(false)
    setEasy(false)
    setMedium(false)
    setHard(false)
    setClassic(false)
    setParty(false)
    setStrategy(false)
    setFilter({})
    clearSearch()
    closeModalFilter()
  }

  const filterGames = () => {
    setFilter({
      players: usePlayers ? players : undefined,
      time: useTime ? time : undefined,
      easy,
      medium,
      hard,
      classic,
      party,
      strategy,
    })
    closeModalFilter()
  }

  return (
    <Modal open={isVisible} onClose={closeModalFilter} disablePortal disableRestoreFocus disableScrollLock>
      <div className={styles.Modal}>
        <div className={styles.ItemContainer}>
          <span className={styles.Title}>
            <img className={styles.Icon} src="images/players.svg" />
            <p className={styles.TitleText}>Número de jogadores</p>
            <Checkbox
              checked={usePlayers}
              onChange={handlePlayerCheck}
              color="secondary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </span>
          <div className={styles.Slider}>
            <Slider
              min={1}
              max={12}
              defaultValue={defaultValue['players']}
              value={players}
              handleStyle={{
                borderWidth: 3,
                borderColor: '#1B0804',
                backgroundColor: '#fff',
                height: 20,
                width: 20,
                marginTop: -7,
              }}
              railStyle={{ height: 6 }}
              trackStyle={{ backgroundColor: '#1B0804', height: 6 }}
              onChange={handlePlayerChange}
            />
            <p className={styles.SliderValue}>{players}</p>
          </div>
        </div>
        <div className={styles.ItemContainer}>
          <span className={styles.Title}>
            <img className={styles.Icon} src="images/time.svg" />
            <p className={styles.TitleText}>Tempo médio de jogo</p>
            <Checkbox
              checked={useTime}
              onChange={handleTimeCheck}
              color="secondary"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </span>
          <div className={styles.Slider}>
            <Slider
              step={10}
              min={10}
              max={210}
              defaultValue={defaultValue['time']}
              value={time}
              handleStyle={{
                borderWidth: 3,
                borderColor: '#1B0804',
                backgroundColor: '#fff',
                height: 20,
                width: 20,
                marginTop: -7,
              }}
              railStyle={{ height: 6 }}
              trackStyle={{ backgroundColor: '#1B0804', height: 6 }}
              onChange={handleTimeChange}
            />
            <p className={styles.SliderValueSmall}>{time} min</p>
          </div>
        </div>
        <div className={styles.ItemContainer}>
          <span className={styles.Title}>
            <img className={styles.Icon} src="images/difficulty.svg" />
            <p className={styles.TitleText}>Dificuldade</p>
          </span>
          <span className={styles.RowButton}>
            <button
              onClick={() => setEasy(value => !value)}
              value="easy"
              className={easy ? styles.SelectedButton : styles.UnselectedButton}
            >
              Fácil
            </button>
            <button
              onClick={() => setMedium(value => !value)}
              value="medium"
              className={medium ? styles.SelectedButton : styles.UnselectedButton}
            >
              Médio
            </button>
            <button
              onClick={() => setHard(value => !value)}
              value="hard"
              className={hard ? styles.SelectedButton : styles.UnselectedButton}
            >
              Díficil
            </button>
          </span>
        </div>
        <div className={styles.ItemContainer}>
          <span className={styles.Title}>
            <img className={styles.Icon} src="images/type.svg" />
            <p className={styles.TitleText}>Tipo de jogo</p>
          </span>
          <span className={styles.RowButton}>
            <button
              onClick={() => setClassic(value => !value)}
              value="classic"
              className={classic ? styles.SelectedButton : styles.UnselectedButton}
            >
              Clássico
            </button>
            <button
              onClick={() => setParty(value => !value)}
              value="party"
              className={party ? styles.SelectedButton : styles.UnselectedButton}
            >
              Party
            </button>
            <button
              onClick={() => setStrategy(value => !value)}
              value="strategy"
              className={strategy ? styles.SelectedButton : styles.UnselectedButton}
            >
              Estratégia
            </button>
          </span>
        </div>
        <span className={styles.RowButtonBottom}>
          <button onClick={cleanFilter} className={styles.CleanButton}>
            Limpar
          </button>
          <button onClick={filterGames} className={styles.FilterButton}>
            Filtrar
          </button>
        </span>
      </div>
    </Modal>
  )
}

export default Filters
