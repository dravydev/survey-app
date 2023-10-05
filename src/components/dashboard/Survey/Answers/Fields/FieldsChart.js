import styles from './fields.module.scss'

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
} from 'chart.js'

import { useMemo } from 'react'

import { Pie } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
    Legend
)

const FieldsChart = ({ fields, mode }) => {

    const cleanFields = mode === 'multipleChoice'
        ? fields.flatMap(field => field)
        : fields.map(field => field.at(0))

    const labels = [...new Set(cleanFields)]

    const data = useMemo(() => {
        return {
            labels,
            datasets: [
                {
                    data: labels.map(label => cleanFields.filter(field => field === label).length),
                    backgroundColor: [
                        'rgba(0, 102, 204, 0.5)',
                        'rgba(51, 153, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(153, 204, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgba(0, 102, 204, 1)',
                        'rgba(51, 153, 255, 1)',
                        'rgba(102, 178, 255, 1)',
                        'rgba(153, 204, 255, 1)',
                    ],
                    borderWidth: 1
                }
            ]
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const options = useMemo(() => {
        return {
            plugins: {
                legend: {
                    display: true,
                    position: 'right'
                },
                tooltip: {
                    backgroundColor: '#1b2033',
                    titleFontSize: 16,
                    titleMarginBottom: 5,
                    titleFontColor: '#0066ff',
                    bodyFontColor: '#000',
                    bodyFontSize: 14,
                    padding: 10,
                    displayColors: false,
                    titleAlign: 'center',
                },
            },
            responsive: true,
            animation: {
                duration: 300,
            }
        }
    }, [])

    return (
        <div className={styles.chart}>
            <Pie data={data} options={options} />
        </div>
    )
}

export default FieldsChart